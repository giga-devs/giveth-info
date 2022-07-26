import { useEffect, useState } from 'react';
import api from '../../api/instance';
import useRoundContext from '../../RoundContext';
import { formatDollarAmount } from '../../utils/numbers';
import {
  Data,
  ErrorMessage,
  HR,
  Icon,
  LinkContainer,
  MyPaginate,
  Pagination,
  Rows,
  TableContainer,
  TableData,
  TableHeader,
  Title,
  URL,
} from './styles';

export enum DataType {
  DONOR = 'DONOR',
  PROJECT = 'PROJECT',
}

interface TableProps {
  title: string;
  headerItems: Array<string>;
  dataType: DataType;
  itemsPerPage: number;
  endpoint: string;
}

export function Table({
  title,
  headerItems,
  itemsPerPage,
  dataType,
  endpoint,
}: TableProps) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { round } = useRoundContext();

  useEffect(() => {
    api
      .get(`${endpoint}?fromDate=${round.fromDate}&toDate=${round.toDate}`)
      .then((response) => {
        setIsLoading(false);
        if (dataType === DataType.DONOR) {
          setData(response.data.leadDonors);
        } else if (dataType === DataType.PROJECT) {
          setData(response.data.leadingProjects);
        }
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false);
          setIsError(true);
        }
      });
  }, [round]);

  useEffect(() => {
    if (!data) return;
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Title>{title}</Title>
      <TableContainer>
        <Data>
          {headerItems.map((header) => (
            <TableHeader key={header}>{header}</TableHeader>
          ))}
        </Data>
        <HR />
        <Rows>
          {!isError &&
            !isLoading &&
            currentItems &&
            dataType === DataType.DONOR &&
            currentItems.map((item) => (
              <Data key={item.donorAddress}>
                <TableData>{item.id}</TableData>
                <LinkContainer
                  href={`https://blockscout.com/xdai/mainnet/address/${item.donorAddress}`}
                  target="_blank"
                >
                  <URL>
                    {item.donorAddress.slice(0, 5)}...
                    {item.donorAddress.slice(-4)}
                  </URL>
                  <Icon src="/images/link.svg" alt="link" />
                </LinkContainer>
                <TableData>{item.donationsCount}</TableData>
                <TableData>
                  {formatDollarAmount(item.totalDonated, 2, true)}
                </TableData>
              </Data>
            ))}

          {!isError &&
            !isLoading &&
            currentItems &&
            dataType === DataType.PROJECT &&
            currentItems.map((item) => (
              <Data key={item.projectTitle}>
                <TableData>{item.id}</TableData>
                <LinkContainer
                  href={`https://giveth.io/project/${item.projectSlug}`}
                  target="_blank"
                >
                  <URL>{item.projectTitle}</URL>
                  <Icon src="/images/link.svg" alt="link" />
                </LinkContainer>
                <TableData>{item.givers}</TableData>
                <TableData>
                  {formatDollarAmount(item.totalDonated, 2, true)}
                </TableData>
              </Data>
            ))}
          {isError && (
            <ErrorMessage>Data is currently not available</ErrorMessage>
          )}
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
  );
}
