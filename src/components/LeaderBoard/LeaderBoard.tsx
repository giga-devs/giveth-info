import styled from "styled-components"
import { H4 } from "@giveth/ui-design-system" 
import { TopDonors } from "./TopDonors"
import { TopProjects } from "./TopProjects"

export function LeaderBoard(){
  return(
    <div>
      <H4 weight={700}>Leaderboards</H4>
      <BoardsContainer>
        <TopDonors />
        <TopProjects />
      </BoardsContainer>
    </div>
  )
}

const BoardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(670px, auto));
  gap: 50px;
  justify-content: space-between;
`