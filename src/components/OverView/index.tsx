import { DataType, KPI } from './KPI';
import { RoundsFilter } from '../RoundsFilter';
import { FilterContainer, Header, KPIContainer, Title } from './styles';

interface KPIType {
  title: string;
  currency: boolean;
  endpoint: string;
  dataType: DataType;
}

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
