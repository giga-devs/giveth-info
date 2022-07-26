import { useEffect, useState } from "react";
import api from "../../api/instance"
import useRoundContext from "../../RoundContext";
import { formatDollarAmount } from '../../utils/numbers'
import styled from "styled-components"
import { mediaQueries } from "../../utils/size"
import { brandColors, H5, P } from "@giveth/ui-design-system";
import ReactPaginate from 'react-paginate';


export enum DataType {
  DONOR ='DONOR',
  PROJECT = 'PROJECT'
}

interface TableProps{
  title: string,
  headerItems: Array<string>,
  dataType: DataType,
  itemsPerPage: number,
  endpoint: string
}

export function Table ({ title, headerItems, itemsPerPage, dataType, endpoint } : TableProps){
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { round } = useRoundContext()

  useEffect(() => {
    api.get(endpoint+'?fromDate='+round.fromDate+'&toDate='+round.toDate)
    .then(function (response) {
      setIsLoading(false)
      if(dataType === DataType.DONOR){
        setData(response.data.leadDonors)
      }
      else if(dataType === DataType.PROJECT){
        setData(response.data.leadingProjects)
      }
    })
    .catch(function (error) {
      setIsLoading(false)
      setIsError(true)
    })
  }, [round]);


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
          {!isError && !isLoading && currentItems && dataType === DataType.DONOR && currentItems.map((item)=>{
            return (
            <Data key={item.donorAddress}>            
                <TableData>
                  {item.id}
                </TableData>
              <LinkContainer href={`https://blockscout.com/xdai/mainnet/address/${item.donorAddress}`} target="_blank"> 
                <URL>
                  {item.donorAddress.slice(0,5)}...{item.donorAddress.slice(-4)}
                </URL>
                <Icon
                  src={`/images/link.svg`}
                  alt='link'
                />
              </LinkContainer>
                <TableData>
                  {item.donationsCount}
                </TableData>
                <TableData>
                  {formatDollarAmount(item.totalDonated, 2, true)} 
                </TableData>
            </Data>
          )})} 
          
          {!isError && !isLoading && currentItems && dataType === DataType.PROJECT && currentItems.map((item)=>{
            return (
              <Data key={item.projectTitle}>            
                <TableData>
                  {item.id}
                </TableData>
                <LinkContainer href={`https://giveth.io/project/${item.projectSlug}`} target="_blank">
                  <URL>
                    {item.projectTitle}
                  </URL>
                  <Icon
                    src={`/images/link.svg`}
                    alt='link'
                  />
                </LinkContainer>
                <TableData>
                  {item.givers}
                </TableData>
                <TableData>
                  {formatDollarAmount(item.totalDonated, 2, true)} 
                </TableData>
              </Data>
            )
          })}
          {isError &&                   
            <ErrorMessage>
              Data is currently not available
            </ErrorMessage>}
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
  ${mediaQueries.mobileS} {
		margin: 0;
    font-size: 14px;
	}
  
  ${mediaQueries.mobileL} {
		margin: 0 12px;
    font-size: 16px;
	}
`

const Title = styled(H5)`
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: ${brandColors.deep[100]};
  margin: 30px 0;
`

const Data = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;
  ${mediaQueries.mobileS} {
		grid-template-columns: 1fr 3fr 2fr 2fr;
	}
  
  ${mediaQueries.desktopL} {
		grid-template-columns: 1fr 2fr 1fr 1fr;
	}
`

const HR = styled.hr`
  border: 1px solid ${brandColors.giv[500]};
  
  ${mediaQueries.mobileS} {
		margin: 16px 0;
	}
  
  ${mediaQueries.mobileL} {
		margin: 16px 16px;
	}
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

  ${mediaQueries.mobileS} {
    font-size: 12px;
	}
  
  ${mediaQueries.mobileL} {
    font-size: 16px;
	}
`

const TableData = styled(P)`
  width: 100%;
  font-weight: 400;
  text-align: center;
  ${mediaQueries.mobileS} {
    font-size: 14px;
	}
  
  ${mediaQueries.mobileL} {
    font-size: 16px;
	}
`

const LinkContainer = styled.a`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries.mobileS} {
    height: 100%;
	}
  
  ${mediaQueries.laptopL} {
    height: 48px;
	}
`

const URL = styled(P)`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: ${brandColors.cyan[600]};
  
  &:hover{
    text-decoration: underline;
  }

  ${mediaQueries.mobileS} {
    font-size: 14px;
	}
  
  ${mediaQueries.mobileL} {
    font-size: 16px;
	}
  
`

const ErrorMessage = styled(P)`
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  color: ${brandColors.deep[100]};
  text-align: center;
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

  ${mediaQueries.mobileS} {
		width: 100%;
    padding: 0;
	}
  
  ${mediaQueries.mobileL} {
		width: 100%;
    padding: 0 16px;
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