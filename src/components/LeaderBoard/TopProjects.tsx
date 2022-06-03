import styled from "styled-components"
import { brandColors, H5, P } from "@giveth/ui-design-system";
import { useEffect, useState } from "react";


export function TopProjects(){

  const headerItems = ['#','Project Name','# Donors','Total Raised']

  const [topProjects, setTopProjects] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/top-projects')
      .then(response => response.json())
      .then(response => setTopProjects(response))
  },[])

  return(
    <div>
      <Title>Top Donors by Total Donated</Title>
      <Table>
        <thead>
          <tr>
            {headerItems.map((header)=>{
              return(
                <th key={header}>
                  <TableHeader>
                  {header}
                  </TableHeader>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {topProjects.map((topProject)=>{
            return (
              <tr>            
                <td>
                  <TableData>
                    {topProject.id}
                  </TableData>
                </td>
                <td>
                <Link>
                  <DonorsAdress>
                    {topProject.name}
                  </DonorsAdress>
                  <Icon
                    src={`/images/link.svg`}
                    alt='link'
                  />
                </Link>
                </td>
                <td>
                  <TableData>
                    {topProject.donors}
                  </TableData>
                </td>
                <td>
                  <TableData>
                    {topProject.raised}
                  </TableData>
                </td>
              </tr>
          )})}
        </tbody>
      </Table>
    </div>
  )
}

const Title = styled(H5)`
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: ${brandColors.deep[100]};
  margin: 30px 0;
`

const TableHeader = styled(P)`
  font-size: 16px;
`

const Table = styled.table`
  width: 100%;
`

const TableData = styled(P)`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`

const DonorsAdress = styled(P)`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: ${brandColors.cyan[600]};

  &:hover{
    text-decoration: underline;
  }
`

const Link = styled.div`
  display: flex;
  justify-content: center;
`

const Icon = styled.img`
  margin-left: 6px
`

const HR = styled.hr`
  border: 1px solid red;
`