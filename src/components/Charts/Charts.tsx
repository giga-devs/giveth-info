import styled from "styled-components"
import { Date } from "../../pages";
import  { mediaQueries } from "../../utils/size"
import { DataType } from "../OverView/KPI";
import { Chart } from "./Chart"

export function Charts(props: Date){
  return (
    <ChartsContainer>
      <Chart 
        endpointKPI='donations/total'
        endpointData="donations"
        currency={true} 
        title="Donations" 
        kpiTitle="Total Donated" 
        fromDate={props.fromDate} 
        toDate={props.toDate}
        dataType={DataType.TOTALDONATED}
      />
      <Chart 
        endpointKPI='projects/total' 
        endpointData="projects"
        currency={false} 
        title="Projects" 
        kpiTitle="Projects Created" 
        fromDate={props.fromDate} 
        toDate={props.toDate}
        dataType={DataType.PROJECTSCREATED}
      />
    </ChartsContainer>
  )
}

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
	${mediaQueries.mobileS} {
		flex-direction: column;
    gap: 50px;
    div {
      width: 100%;
    }
  }

  ${mediaQueries.laptopL} {
		flex-direction: row;
    div {
      width: 99%;
    }
  }
`