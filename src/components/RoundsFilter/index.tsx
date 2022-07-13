import styled from "styled-components"
import { brandColors } from "@giveth/ui-design-system"
import { Dispatch, useEffect, useState } from "react"
import api from "../../api/instance"
import Skeleton from "react-loading-skeleton"
import { formatDate } from '../../utils/numbers'

export interface RoundFilterType {
  fromDate: string
  setFromDate: Dispatch<string>
  toDate: string
  setToDate: Dispatch<string>
}

export function RoundsFilter(props:RoundFilterType){
  const [value, setValue] = useState([])
  const [option, setOption] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    api.get('/rounds')
    .then(function (response) {
      setValue(response.data.rounds)
      setIsLoading(false)
    })
    .catch(function (error) {
        setIsLoading(false)
        setIsError(true)
    })
  },[])

  function handleRound(round){
    props.setFromDate(round.fromDate)
    props.setToDate(round.toDate)
  }

  function handleRefresh(){
    props.setFromDate('')
    props.setToDate('')
    setOption('')
  }

  return (
      <SelectContainer>
        {isLoading && 
          <Skeleton height={32} width={240} highlightColor={brandColors.giv[600]} baseColor={brandColors.giv[700]}/>
        }
        {!isLoading && !isError &&
          <SelectContainer>
            <Select value={option} onChange={e => setOption(e.target.value)}>
              <option>Select a round</option>
              {value.map((round)=>{
                return (
                  <option key={round.round} onClick={()=>handleRound(round)}>
                    #{round.round} {formatDate(round.fromDate)} - {formatDate(round.toDate)}
                  </option>)
              })}
            </Select>
            <Button onClick={handleRefresh}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
            </Button>
          </SelectContainer>
        }
      </SelectContainer>
  )
}

const SelectContainer = styled.div`
  display: flex;
  justify-content: end;
`

const Select = styled.select`
  background-color: ${brandColors.giv[700]};
  height: 32px;
  width: 240px;
  border: none;
  border-radius: 8px;
  color: #ffff;
  text-align: center;
`

const Button = styled.button`
  background-color: ${brandColors.giv[700]};
  color: #ffff;
  border: none;
  height: 32px;
  border-radius: 8px;
  width: 50px;
  margin-left: 8px;

  &:hover{
    cursor: pointer;
    background-color: ${brandColors.giv[800]};
  }
`