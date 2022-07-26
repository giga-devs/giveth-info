import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styled from 'styled-components';
import { H4, brandColors, P } from '@giveth/ui-design-system';
import Skeleton from 'react-loading-skeleton';
import { DataType } from '../OverView/KPI';
import { formatDollarAmount, formatLabelDate } from '../../utils/numbers';
import useRoundContext from '../../RoundContext';
import 'react-loading-skeleton/dist/skeleton.css';
import api from '../../api/instance';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  endpointKPI: string;
  endpointData: string;
  currency: boolean;
  title: string;
  kpiTitle: string;
  dataType: DataType;
}

const TitleH1 = styled(H4)`
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  background-color: ${brandColors.giv[700]};
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 285px;
`;

const ErrorMessage = styled(P)`
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  color: ${brandColors.deep[100]};
  text-align: center;
`;

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

const TitleKPI = styled(P)`
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

export function Chart({
  endpointKPI,
  endpointData,
  currency,
  title,
  kpiTitle,
  dataType,
}: ChartProps) {
  const [value, setValue] = useState(0);
  const [data, setData] = useState({
    labels: ['a', 'b'],
    datasets: [
      {
        data: [1, 2],
        backgroundColor: '#5D5FEF',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  });
  const [chartsData, setChartsData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { round } = useRoundContext();

  const options = {
    onHover(evt, item) {
      if (item.length > 0) {
        setCurrentValue(item[0].element.$context.raw);
      } else {
        setCurrentValue(value);
      }
    },
    responsive: true,
    scales: {
      xAxes: {
        ticks: {
          color: '#5D5FEF',
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 24,
        right: 24,
        top: 18,
        bottom: 18,
      },
    },
  };
  useEffect(() => {
    setChartLabels([]);
    setChartsData([]);
    setData({
      labels: chartLabels,
      datasets: [
        {
          data: chartsData,
          backgroundColor: '#5D5FEF',
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    });
  }, []);
  useEffect(() => {
    setChartLabels([]);
    setChartsData([]);
    api
      .get(`${endpointKPI}?fromDate=${round.fromDate}&toDate=${round.toDate}`)
      .then((response) => {
        setIsLoading(false);
        if (dataType === DataType.TOTALDONATED) {
          setValue(response.data.valueUsd);
          setCurrentValue(response.data.valueUsd);
        } else if (dataType === DataType.PROJECTSCREATED) {
          setValue(response.data.totalProjects);
          setCurrentValue(response.data.totalProjects);
        }
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false);
          setIsError(true);
        }
      });
    api
      .get(`${endpointData}?fromDate=${round.fromDate}&toDate=${round.toDate}`)
      .then((response) => {
        if (dataType === DataType.TOTALDONATED) {
          const chartLabelsDonation = [];
          const chartsDataDonation = [];

          if (response.data.totalDonations.length > 0) {
            response.data.totalDonations.forEach((donation) => {
              chartLabelsDonation.push(formatLabelDate(donation.date));
              chartsDataDonation.push(donation.totalDonated);
              setData({
                labels: chartLabelsDonation,
                datasets: [
                  {
                    data: chartsDataDonation,
                    backgroundColor: '#5D5FEF',
                    borderRadius: 8,
                    borderSkipped: false,
                  },
                ],
              });
            });
          } else {
            setData({
              labels: [' '],
              datasets: [
                {
                  data: [0],
                  backgroundColor: '#5D5FEF',
                  borderRadius: 8,
                  borderSkipped: false,
                },
              ],
            });
          }
        } else if (dataType === DataType.PROJECTSCREATED) {
          const chartLabelsProject = [];
          const chartsDataProject = [];
          if (response.data.result.length > 0) {
            response.data.result.forEach((projects) => {
              chartLabelsProject.push(formatLabelDate(projects.date));
              chartsDataProject.push(projects.count);
              setData({
                labels: chartLabelsProject,
                datasets: [
                  {
                    data: chartsDataProject,
                    backgroundColor: '#5D5FEF',
                    borderRadius: 8,
                    borderSkipped: false,
                  },
                ],
              });
            });
          } else {
            setData({
              labels: [' '],
              datasets: [
                {
                  data: [0],
                  backgroundColor: '#5D5FEF',
                  borderRadius: 8,
                  borderSkipped: false,
                },
              ],
            });
          }
        }
      });
  }, [round]);

  return (
    <div>
      <TitleH1 weight={700}>{title}</TitleH1>
      <ChartContainer>
        {isLoading && (
          <Skeleton
            height={300}
            highlightColor={brandColors.giv[600]}
            baseColor={brandColors.giv[700]}
          />
        )}
        {isError && (
          <ErrorContainer>
            <ErrorMessage>Data is currently not available</ErrorMessage>
          </ErrorContainer>
        )}
        {!isLoading && !isError && (
          <>
            <KPICard>
              <Content>
                <TitleKPI>{kpiTitle}</TitleKPI>
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
                    <Number>{formatDollarAmount(currentValue, 2, true)}</Number>
                  </Value>
                )}
                {!isLoading && !isError && !currency && (
                  <Value>
                    <Number>{currentValue}</Number>
                  </Value>
                )}
              </Content>
            </KPICard>
            <Bar options={options} data={data} />
          </>
        )}
      </ChartContainer>
    </div>
  );
}
