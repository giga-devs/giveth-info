import { useEffect, useState } from "react";
import styled from "styled-components"
import { brandColors, H5, P } from "@giveth/ui-design-system";
import { formatDollarAmount } from '../../utils/numbers'
import ReactPaginate from 'react-paginate';

export function TopProjects({ itemsPerPage }){

  const headerItems = ['#','Project Name','# Donors','Total Raised']
  const [topProjects, setTopProjects] = useState([])
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/api/top-projects')
      .then(response => response.json())
      .then(response => setTopProjects(response))
  },[])

  useEffect(() => {
    if(!topProjects) return

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(topProjects.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(topProjects.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, topProjects]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % topProjects.length;
    setItemOffset(newOffset);
  };

  return(
    <div>
      <Title>Top Donors by Total Donated</Title>
      <Data>
        {headerItems.map((header)=>{
          return(
            <TableHeader key={header}>
            {header}
            </TableHeader>
          )
        })}
      </Data>
      <HR />
      <Rows>
        {currentItems ? currentItems.map((topProject)=>{
          return (
          <Data key={topProject.id}>            
              <TableData>
                {topProject.id}
              </TableData>
            <Link>
              <DonorsAdress>
                {topProject.name}
              </DonorsAdress>
              <Icon
                src={`/images/link.svg`}
                alt='link'
              />
            </Link>
              <TableData>
                {topProject.donors}
              </TableData>
              <TableData>
                {formatDollarAmount(topProject.raised, 2, true)} 
              </TableData>
          </Data>
        )}) : <h1>loading</h1>}
      </Rows>
      <HR />
      <MyPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName="break-me"
        containerClassName="pagination"
        activeClassName="active"
      />
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
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`

const TableData = styled(P)`
  width: 100%;
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
  width: 100%;
  display: flex;
  justify-content: center;
`

const Icon = styled.img`
  width: 12px;
  margin-left: 6px
`

const Data = styled.div`
  display: flex;
  justify-content: space-between;
`

const HR = styled.hr`
  border: 1px solid ${brandColors.giv[500]};
  margin: 16px 24px;
`

const Rows = styled.div`
  display: grid;
  gap: 12px;
`

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: #fff 1px solid;
    color: #fff;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: #fff;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;