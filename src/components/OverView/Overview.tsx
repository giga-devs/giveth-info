import { useEffect, useState } from "react"
import { KPI, KPIType } from "./KPI"

import styled from "styled-components"
import { H4 } from "@giveth/ui-design-system" 
import { mediaQueries } from "../../utils/size"

export function OverView(){
  const KPIS:Array<KPIType> = [
    {
      title: 'Total Donated',
      endpoint: 'total-donated',
      currency: true
    },
    {
      title: 'Donors Registered',
      endpoint: 'donors',
      currency: false
    },
    {
      title: 'Projects Created',
      endpoint: 'projects',
      currency: false
    },
    {
      title: 'Top Donation',
      endpoint: 'top-donation',
      currency: true
    },
  ]
  
  return(
    <div>
      <Title weight={700}>Overview</Title>
      <KPIContainer>
        {KPIS.map((kpi)=>{
          return <KPI key={kpi.endpoint} title={kpi.title} currency={kpi.currency} endpoint={kpi.endpoint}/>
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