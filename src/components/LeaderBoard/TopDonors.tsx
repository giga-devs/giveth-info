import styled from "styled-components"
import { brandColors, H5, P } from "@giveth/ui-design-system";
import { useEffect, useState } from "react";


export function TopDonors(){

  const headerItems = ['#','Donor Address','# Donations','Total Donated']

  const [topDonors, setTopDonors] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/top-donations')
      .then(response => response.json())
      .then(response => setTopDonors(response))
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
          {topDonors.map((topDonor)=>{
            return (
              <tr>            
                <td>
                  <TableData>
                    {topDonor.id}
                  </TableData>
                </td>
                <td>
                <Link>
                  <DonorsAdress>
                    {topDonor.adress}
                  </DonorsAdress>
                  <Icon
                    src={`/images/link.svg`}
                    alt='link'
                  />
                </Link>
                </td>
                <td>
                  <TableData>
                    {topDonor.quantity}
                  </TableData>
                </td>
                <td>
                  <TableData>
                    {topDonor.value}
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
  width: 670px;
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