import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { brandColors, P } from '@giveth/ui-design-system';
import Skeleton from 'react-loading-skeleton';
import api from '@/api/instance';
import useRoundContext from '@/RoundContext';
import { formatDollarAmount } from '@/utils/numbers';
import 'react-loading-skeleton/dist/skeleton.css';

interface KPIProps {
  title: string;
  currency: boolean;
  endpoint: string;
  dataType: DataType;
}

export enum DataType {
  TOTALDONATED = 'TOTALDONATED',
  DONORREGISTER = 'DONORREGISTER',
  PROJECTSCREATED = 'PROJECTSCREATED',
  TOPDONATION = 'TOPDONATION',
}

const KPICard = styled.div`
  background-color: ${brandColors.giv[700]};
  height: 100px;
  width: 100%;
  border-radius: 8px;
`;

const Content = styled.div`
  padding: 18px 24px;
`;

const Value = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(P)`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${brandColors.deep[100]};
`;

const Number = styled(P)`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
`;

export function KPI({ title, currency, endpoint, dataType }: KPIProps) {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { round } = useRoundContext();

  useEffect(() => {
    api
      .get(`${endpoint}?fromDate=${round.fromDate}&toDate=${round.toDate}`)
      .then((response) => {
        setIsLoading(false);
        if (dataType === DataType.TOTALDONATED) {
          setValue(response.data.valueUsd);
        } else if (dataType === DataType.PROJECTSCREATED) {
          setValue(response.data.totalProjects);
        } else if (dataType === DataType.DONORREGISTER) {
          setValue(response.data.donorsCount);
        } else if (dataType === DataType.TOPDONATION) {
          setValue(
            Math.max(...response.data.totalDonations.map((o) => o.totalDonated))
          );
        }
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false);
          setIsError(true);
        }
      });
  }, [round]);

  return (
    <KPICard>
      <Content>
        <Title>{title}</Title>
        {isLoading && (
          <Skeleton
            height={42}
            highlightColor={brandColors.giv[600]}
            baseColor={brandColors.giv[700]}
          />
        )}
        {isError && (
          <Value>
            <Number>-</Number>
          </Value>
        )}
        {!isLoading && !isError && currency && (
          <Value>
            <Number>{formatDollarAmount(value, 2, true)}</Number>
          </Value>
        )}
        {!isLoading && !isError && !currency && (
          <Value>
            <Number>{value}</Number>
          </Value>
        )}
      </Content>
    </KPICard>
  );
}
