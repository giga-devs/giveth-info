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

import { brandColors } from '@giveth/ui-design-system';
import Skeleton from 'react-loading-skeleton';
import { formatDollarAmount, formatLabelDate } from '@/utils/numbers';
import useRoundContext from '@/RoundContext';
import api from '@/api/instance';
import { DataType } from '../../OverView/KPI';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  ChartContainer,
  Content,
  ErrorContainer,
  ErrorMessage,
  KPICard,
  Number,
  TitleH1,
  TitleKPI,
  Value,
} from './styles';

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
