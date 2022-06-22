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

  const Tables = [
    {
      title: "Top Donors by Total Donated",
      headerItems: ['#','Donor Address','# Donations','Total Donated'],
      dataType: DataType.DONOR,
      endpoint: 'top-donations',
    },
    {
      title: "Top Projects by Total Donated", 
      headerItems: ['#','Project Name','# Donors','Total Raised'],
      dataType: DataType.PROJECT,
      endpoint: 'top-projects',
    }
  ]

  return(
    <div>
      <H4 weight={700}>Leaderboards</H4>
      <BoardsContainer>
        {Tables.map((table)=>{
          return (
            <Table 
              key = {table.endpoint}
              title={table.title}
              headerItems={table.headerItems}
              dataType={table.dataType}
              itemsPerPage={6}
              endpoint={table.endpoint}
            />
          )
        })}
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