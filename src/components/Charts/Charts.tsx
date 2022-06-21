import styled from "styled-components"
import  { mediaQueries } from "../../utils/size"

import { DonationChart } from "./DonationChart"
import { ProjectChart } from "./ProjectChart"

export function Charts(){
  return (
    <ChartsContainer>
        <DonationChart />
        <ProjectChart />
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