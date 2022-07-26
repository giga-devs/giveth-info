import styled from 'styled-components';
import { H4 } from '@giveth/ui-design-system';
import { mediaQueries } from '../../utils/size';
import { DataType, KPI } from './KPI';
import { RoundsFilter } from '../RoundsFilter';

interface KPIType {
  title: string;
  currency: boolean;
  endpoint: string;
  dataType: DataType;
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaQueries.mobileS} {
    align-items: start;
    flex-direction: column-reverse;
  }
  ${mediaQueries.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  ${mediaQueries.mobileS} {
    justify-content: center;
    margin-bottom: 20px;
  }
  ${mediaQueries.tablet} {
    justify-content: end;
    margin-bottom: 0;
  }
`;

const KPIContainer = styled.div`
  margin-top: 30px;
  display: grid;
  width: 100%;
  justify-content: space-between;
  gap: 50px;

  ${mediaQueries.mobileS} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${mediaQueries.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mediaQueries.laptopL} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Title = styled(H4)`
  width: 100%;
`;

export function OverView() {
  const KPIS: Array<KPIType> = [
    {
      title: 'Total Donated',
      endpoint: 'donations/total',
      currency: true,
      dataType: DataType.TOTALDONATED,
    },
    {
      title: 'Donors Registered',
      endpoint: 'donations/donors',
      currency: false,
      dataType: DataType.DONORREGISTER,
    },
    {
      title: 'Projects Created',
      endpoint: 'projects/total',
      currency: false,
      dataType: DataType.PROJECTSCREATED,
    },
    {
      title: 'Top Daily Sum of Donations',
      endpoint: 'donations',
      currency: true,
      dataType: DataType.TOPDONATION,
    },
  ];
  return (
    <div>
      <Header>
        <Title weight={700}>Overview</Title>
        <FilterContainer>
          <RoundsFilter />
        </FilterContainer>
      </Header>
      <KPIContainer>
        {KPIS.map((kpi) => (
          <KPI
            key={kpi.endpoint}
            title={kpi.title}
            currency={kpi.currency}
            endpoint={kpi.endpoint}
            dataType={kpi.dataType}
          />
        ))}
      </KPIContainer>
    </div>
  );
}
