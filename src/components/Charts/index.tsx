import { DataType } from '../OverView/KPI';
import { Chart } from './Chart';
import { ChartsContainer } from './styles';

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
