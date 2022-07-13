import { useEffect, useState } from "react"
import { DataType, KPI } from "./KPI"

import styled from "styled-components"
import { H4 } from "@giveth/ui-design-system" 
import { mediaQueries } from "../../utils/size"
import { Date } from "../../pages"

interface KPIType{
  title: string
  currency: boolean
  endpoint: string
  dataType: DataType
}

export function OverView(props: Date){
  const KPIS:Array<KPIType> = [
    {
      title: 'Total Donated',
      endpoint: 'donations/total',
      currency: true,
      dataType: DataType.TOTALDONATED,
    },
    {
      title: 'Donors Registered',
      endpoint: 'donations/donors',
      currency: false,
      dataType: DataType.DONORREGISTER,
    },
    {
      title: 'Projects Created',
      endpoint: 'projects/total',
      currency: false,
      dataType: DataType.PROJECTSCREATED,
    },
    {
      title: 'Top Donation',
      endpoint: 'donations',
      currency: true,
      dataType: DataType.TOPDONATION,
    },
  ]
  return(
    <div>
      <Title weight={700}>Overview</Title>
      <KPIContainer>
        {KPIS.map((kpi)=>{
          return <KPI key={kpi.endpoint} title={kpi.title} currency={kpi.currency} endpoint={kpi.endpoint} dataType={kpi.dataType} fromDate={props.fromDate} toDate={props.toDate}/>
        })}
      </KPIContainer>
    </div>
  )
}

const KPIContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: space-between;
  gap: 50px;

	${mediaQueries.mobileS} {
		grid-template-columns: repeat(1, 1fr);
	}

	${mediaQueries.laptop} {
		grid-template-columns: repeat(2, 1fr);
	}
	${mediaQueries.laptopL} {
		grid-template-columns: repeat(4, 1fr);
	}
`

const Title = styled(H4)`
  margin-bottom: 30px;
`