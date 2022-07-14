import styled from "styled-components"
import { brandColors } from "@giveth/ui-design-system"
import Select from 'react-select'
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

export interface LabelType {
  value: {
    fromDate: string, 
    toDate: string
  }
  label: string
}

export function RoundsFilter(props:RoundFilterType){
  const [value, setValue] = useState([])
  const [labels,setLabels] = useState<LabelType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get('/rounds')
    .then(function (response) {
      setValue(response.data.rounds)
      setIsLoading(false)
    })
    .catch(function (error) {
        setIsLoading(false)
    })
  },[])
  
  useEffect(()=>{
    setLabels([])
    value.forEach(treatLabel)
  },[value])

  function treatLabel(item,index){
    const label = {
      value:{
        fromDate:item.fromDate, 
        toDate: item.toDate
      },
      label: `#${item.round} ${formatDate(item.fromDate)} - ${formatDate(item.toDate)}`,
    }
    setLabels(labels => [...labels,label])
  }
  function handleRound(round){
    if(round===null){
      props.setFromDate('')
      props.setToDate('')
    } else{
      props.setFromDate(round.value.fromDate)
      props.setToDate(round.value.toDate)
    }
  }

  return (
      <SelectContainer>
        {isLoading && 
          <Skeleton height={38} width={344} borderRadius={8} highlightColor={brandColors.giv[600]} baseColor={brandColors.giv[700]}/>
        }
        {!isLoading &&
          <SelectContainer>
            <Select 
              options={labels} 
              onChange={(e) => handleRound(e)}
              placeholder="Select a round"
              id="long-value-select" 
              instanceId="long-value-select"
              isClearable={true}
              isSearchable={false}
              styles={styles}
              theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                  ...theme.colors,
                    neutral0:brandColors.giv[700],
                    primary25: brandColors.giv[900],
                    primary: brandColors.giv[900],
                    neutral50: brandColors.deep[100]
                  },
                })}
              />
          </SelectContainer>
        }
      </SelectContainer>
  )
}

const styles = {
  control: (provided, state) => ({
    ...provided,
    color: '#ffff',
    border: 0,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: '#ffff',
    border:0,
  }),
  container: provided => ({
    ...provided,
    width: 344,
    fontFamily: 'Red Hat Text',
    textAlign: 'center',
  })
};

const SelectContainer = styled.div`
  display: flex;
`