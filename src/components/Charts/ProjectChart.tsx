import { useState, useEffect } from "react"
import { KPI } from "../OverView/KPI"

import styled from "styled-components"
import { H4, brandColors } from "@giveth/ui-design-system" 

export function ProjectChart(){
  const [projectsCreated, setProjectsCreated] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then(response => response.json())
      .then(data => setProjectsCreated(data.value))
  },[])

  return(
    <div>
      <Title weight={700}>Projects</Title>
      <ChartContainer>
        <KPI title='Total Donated'value={projectsCreated} currency={true}/>
      </ChartContainer>
    </div>
  )
}

const Title = styled(H4)`
  margin-bottom: 30px;
`

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  background-color: ${brandColors.giv[700]};
  border-radius: 8px;
`