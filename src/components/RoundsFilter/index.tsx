import { useEffect, useState } from "react"
import api from "../../api/instance"
import useRoundContext from "../../RoundContext"
import { formatDate } from '../../utils/numbers'
import styled from "styled-components"
import { brandColors } from "@giveth/ui-design-system"
import Select from 'react-select'
import Skeleton from "react-loading-skeleton"


export interface LabelType {
  value: {
    fromDate: string, 
    toDate: string
  }
  label: string
}

export function RoundsFilter(){
  const [value, setValue] = useState([])
  const [labels,setLabels] = useState<LabelType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { setRound } = useRoundContext()

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
      setRound({
        fromDate: '',
        toDate:'',
      })
    } else {
      setRound({
        fromDate: round.value.fromDate,
        toDate: round.value.toDate,
      })
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
  }),
  menuPortal: provided => ({ ...provided, zIndex: 9999 }),
  menu: provided => ({ ...provided, zIndex: 9999 })
};

const SelectContainer = styled.div`
  display: flex;
`