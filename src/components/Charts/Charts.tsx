import styled from "styled-components"
import { DonationChart } from "./DonationChart"
import { ProjectChart } from "./ProjectChart"

export function Charts(){
  return (
    <ChartsContainer>
      <DonationChart/>
      <ProjectChart/>
    </ChartsContainer>
  )
}

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(670px, auto));
  gap: 50px;
  justify-content: space-between;
`