import { useEffect, useState } from "react"

import styled from "styled-components"
import { H4 } from "@giveth/ui-design-system" 
import  { mediaQueries } from "../../utils/size"
import { DataType, Table } from "./Table"

export interface donorsProps {
  id: number,
  adress: string,
  quantity: number,
  value: number
}

export interface projectsProps {
  id: number,
  name: string,
  donors: number,
  raised: number
}

export function LeaderBoard(){

  const donorsHeader = ['#','Donor Address','# Donations','Total Donated']
  const projectsHeader = ['#','Project Name','# Donors','Total Raised']

  const [topDonors, setTopDonors] = useState([])
  const [topProjects, setTopProjects] = useState([])


  useEffect(() => {
    fetch('http://localhost:3000/api/top-donations')
      .then(response => response.json())
      .then(response => setTopDonors(response))
    fetch('http://localhost:3000/api/top-projects')
      .then(response => response.json())
      .then(response => setTopProjects(response))
  },[])

  return(
    <div>
      <H4 weight={700}>Leaderboards</H4>
      <BoardsContainer>
        <Table 
          title="Top Donors by Total Donated" 
          data={topDonors}
          headerItems={donorsHeader}
          dataType={DataType.DONOR}
          itemsPerPage={6}
        />
        <Table 
          title="Top Projects by Total Donated" 
          data={topProjects}
          headerItems={projectsHeader}
          dataType={DataType.PROJECT}
          itemsPerPage={6}
        />
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