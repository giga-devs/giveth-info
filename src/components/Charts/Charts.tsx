import styled from 'styled-components';
import { mediaQueries } from '@/utils/size';
import { DataType } from '../OverView/KPI';
import { Chart } from './Chart';

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${mediaQueries.mobileS} {
    flex-direction: column;
    gap: 50px;
    div {
      width: 100%;
    }
  }

  ${mediaQueries.laptopL} {
    flex-direction: row;
    div {
      width: 99%;
    }
  }
`;

export function Charts() {
  return (
    <ChartsContainer>
      <Chart
        endpointKPI="donations/total"
        endpointData="donations"
        currency
        title="Donations"
        kpiTitle="Total Donated"
        dataType={DataType.TOTALDONATED}
      />
      <Chart
        endpointKPI="projects/total"
        endpointData="projects"
        currency={false}
        title="Projects"
        kpiTitle="Projects Created"
        dataType={DataType.PROJECTSCREATED}
      />
    </ChartsContainer>
  );
}
