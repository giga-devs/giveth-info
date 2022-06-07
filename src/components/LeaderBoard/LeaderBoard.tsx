import styled from "styled-components"
import { H4 } from "@giveth/ui-design-system" 
import  { mediaQueries } from "../../utils/size"

import { TopDonors } from "./TopDonors"
import { TopProjects } from "./TopProjects"

export function LeaderBoard(){
  return(
    <div>
      <H4 weight={700}>Leaderboards</H4>
      <BoardsContainer>
        <TopDonors />
        <TopProjects itemsPerPage={4}/>
      </BoardsContainer>
    </div>
  )
}

const BoardsContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: space-between;
  gap: 50px;

	${mediaQueries.mobileS} {
		grid-template-columns: repeat(1, 1fr);
	}

	${mediaQueries.laptopL} {
		grid-template-columns: repeat(2, 1fr);
	}
`