import { brandColors, P } from "@giveth/ui-design-system";
import styled from "styled-components";
import { formatDollarAmount } from '../../utils/numbers'
import { useEffect, useState } from "react"
import api from "../../api/instance"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export interface KPIType{
  title: string
  currency: boolean
  endpoint: string
}

export function KPI(props: KPIType){
  const [value, setValue] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    api.get(props.endpoint)
    .then(function (response) {
      setIsLoading(false)
      setValue(response.data.value)
    })
    .catch(function (error) {
      setIsLoading(false)
      setIsError(true)
    })
  },[])

  return(
    <KPICard>
      <Content>
        <Title>{props.title}</Title>
        {isLoading && 
          <Skeleton height={42} highlightColor={brandColors.giv[600]} baseColor={brandColors.giv[700]}/>
        }
        {isError &&
          <Value>
            <Number>-</Number>
          </Value>
        }
        {!isLoading && !isError && props.currency &&
          <Value>
            <Number>{formatDollarAmount(value, 2, true)}</Number>
          </Value>
        }
        {!isLoading && !isError && !props.currency &&
          <Value>
            <Number>{value}</Number>
          </Value>
        }
      </Content>
    </KPICard>
  )
}

const KPICard = styled.div`
  background-color:${brandColors.giv[700]};
  height: 100px;
  width: 100%;
  border-radius: 8px;
`

const Content = styled.div`
  padding: 18px 24px;
`

const Value = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Title = styled(P)`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${brandColors.deep[100]}
`

const Number = styled(P)`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
`