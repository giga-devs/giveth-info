import styled from "styled-components"
import { brandColors, H5, P } from "@giveth/ui-design-system";
import ReactPaginate from 'react-paginate';

import { formatDollarAmount } from '../../utils/numbers'
import  { mediaQueries } from "../../utils/size"
import { useEffect, useState } from "react";
import { donorsProps, projectsProps } from "./LeaderBoard";

export enum DataType {
  DONOR ='DONOR',
  PROJECT = 'PROJECT'
}

interface TableProps{
  title: string,
  data: Array<donorsProps> | Array<projectsProps>,
  headerItems: Array<string>,
  dataType: DataType,
  itemsPerPage: number,
}

export function Table ({ title, data, headerItems, itemsPerPage, dataType } : TableProps){

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if(!data) return

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return(
    <div>
      <Title>{title}</Title>
      <TableContainer>
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
          {currentItems && dataType === DataType.DONOR ? currentItems.map((item)=>{
            return (
            <Data key={item.id}>            
                <TableData>
                  {item.id}
                </TableData>
              <Link>
                <URL>
                  {item.adress.slice(0,5)}...{item.adress.slice(-4)}
                </URL>
                <Icon
                  src={`/images/link.svg`}
                  alt='link'
                />
              </Link>
                <TableData>
                  {item.quantity}
                </TableData>
                <TableData>
                  {formatDollarAmount(item.value, 2, true)} 
                </TableData>
            </Data>
          )}) :
          
          currentItems && dataType === DataType.PROJECT ? currentItems.map((item)=>{
            return (
              <Data key={item.id}>            
              <TableData>
                {item.id}
              </TableData>
            <Link>
              <URL>
                {item.name}
              </URL>
              <Icon
                src={`/images/link.svg`}
                alt='link'
              />
            </Link>
              <TableData>
                {item.donors}
              </TableData>
              <TableData>
                {formatDollarAmount(item.raised, 2, true)} 
              </TableData>
          </Data>
          )}) : 
          
          <h1>loading</h1>}
        </Rows>
        <HR />
        <Pagination>
          <MyPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< Prev"
            renderOnZeroPageCount={null}
            breakClassName="break-me"
            containerClassName="pagination"
            activeClassName="active"
          />
        </Pagination>
      </TableContainer>
    </div>
  )
}

const TableContainer = styled.div`
  margin: 0 12px;
  `

const Title = styled(H5)`
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: ${brandColors.deep[100]};
  margin: 30px 0;
`

const Data = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HR = styled.hr`
  border: 1px solid ${brandColors.giv[500]};
  margin: 16px 16px;
`

const Rows = styled.div`
  display: grid;
  gap: 12px;
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

const Link = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  &:hover{
    text-decoration: underline;
  }
`

const URL = styled(P)`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: ${brandColors.cyan[600]};
`

const Icon = styled.img`
  width: 12px;
  margin-left: 6px
`

const Pagination = styled.div`
  display: flex;
  justify-content: end;
`

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  width: 55%;
  font-family: 'Red Hat Text';
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 42px;

  ${mediaQueries.mobileS} {
		width: 100%;
	}

  ${mediaQueries.desktop} {
		width: 55%;
	}

  li a {
    padding: 0.2rem 0.2rem;
    color: #bbc3d4;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active {
    border-bottom: 2px solid ${brandColors.giv[500]};
  }
  li.active a {
    color: white;
  }
  li.disabled a {
    color: #fff;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;