import styled from 'styled-components';
import { H4 } from '@giveth/ui-design-system';
import { mediaQueries } from '../../utils/size';
import { DataType, Table } from './Table';

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
`;

export function LeaderBoard() {
  const Tables = [
    {
      title: 'Top Donors by Total Donated',
      headerItems: ['#', 'Donor Address', '# Donations', 'Total Donated'],
      dataType: DataType.DONOR,
      endpoint: 'leaders/donors',
    },
    {
      title: 'Top Projects by Total Donated',
      headerItems: ['#', 'Project Name', '# Donors', 'Total Raised'],
      dataType: DataType.PROJECT,
      endpoint: 'leaders/projects',
    },
  ];

  return (
    <div>
      <H4 weight={700}>Leaderboards</H4>
      <BoardsContainer>
        {Tables.map((table) => (
          <Table
            key={table.endpoint}
            title={table.title}
            headerItems={table.headerItems}
            dataType={table.dataType}
            itemsPerPage={6}
            endpoint={table.endpoint}
          />
        ))}
      </BoardsContainer>
    </div>
  );
}
