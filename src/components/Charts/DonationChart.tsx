import { useState, useEffect } from "react"
import { KPI } from "../OverView/KPI"

import styled from "styled-components"
import { H4, brandColors } from "@giveth/ui-design-system"
import Chart from './Foo';

export function DonationChart(){
  const [totalDonated, setTotalDonated] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3000/api/total-donated')
      .then(response => response.json())
      .then(data => setTotalDonated(data.value))
  },[])

  return(
    <div>
      <Title weight={700}>Donations</Title>
      <ChartContainer>
        <KPI title='Total Donated'value={totalDonated} currency={true}/>
        <Chart data={[{step: 1, value: 2}, {step: 2, value: 4}]}/>
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
