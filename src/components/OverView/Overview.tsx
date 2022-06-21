import { useEffect, useState } from "react"
import { KPI } from "./KPI"

import styled from "styled-components"
import { H4 } from "@giveth/ui-design-system" 
import { mediaQueries } from "../../utils/size"

export function OverView(){
  const [totalDonated, setTotalDonated] = useState(0)
  const [donorsRegistered, setDonorsRegistered] = useState(0)
  const [projectsCreated, setProjectsCreated] = useState(0)
  const [topDonation, setTopDonation] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3000/api/total-donated')
      .then(response => response.json())
      .then(data => setTotalDonated(data.value))

    fetch('http://localhost:3000/api/donors')
    .then(response => response.json())
    .then(data => setDonorsRegistered(data.value))

    fetch('http://localhost:3000/api/projects')
    .then(response => response.json())
    .then(data => setProjectsCreated(data.value))

    fetch('http://localhost:3000/api/top-donation')
    .then(response => response.json())
    .then(data => setTopDonation(data.value))
  },[])

  return(
    <div>
      <Title weight={700}>Overview</Title>
      <KPIContainer>
        <KPI title='Total Donated'value={totalDonated} currency={true}/>
        <KPI title='Donors Registered' value={donorsRegistered} currency={false}/>
        <KPI title='Projects Created' value={projectsCreated} currency={false}/>
        <KPI title='Top Donation' value={topDonation} currency={true}/>
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