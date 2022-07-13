import React, { useState, useEffect } from "react"
import { Bar } from 'react-chartjs-2';
import styled from "styled-components"
import { H4, brandColors, P } from "@giveth/ui-design-system"
import { formatDollarAmount, formatLabelDate } from '../../utils/numbers'
import api from "../../api/instance"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DataType } from "../OverView/KPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps{
  endpointKPI: string
  endpointData: string
  currency: boolean
  title: string
  kpiTitle: string
  dataType: DataType
  fromDate: string
  toDate: string
}
  
export function Chart(props:ChartProps){
  const [value, setValue] = useState(0)
  const [data, setData] = useState({})
  const [chartsData, setChartsData] = useState([])
  const [labels, setLabels] = useState([])
  const [currentValue, setCurrentValue] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const options = {
    onHover: function(evt, item) { 
      if (item.length>0) {
        setCurrentValue(item[0].element.$context.raw);
      }
      else {
        setCurrentValue(value)
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
        }
      },
      y: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false
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
  useEffect(()=>{
    setLabels([])
    setChartsData([])
    setData({
      labels,
      datasets: [
        {
          data: chartsData,
          borderSkipped: false,
          backgroundColor: '#5D5FEF',
          borderRadius: 8,
        },
      ],
    })
  },[])
  useEffect(()=>{
    setLabels([])
    setChartsData([])
    api.get(props.endpointKPI+'?fromDate='+props.fromDate+'&toDate='+props.toDate)
    .then(function (response) {
      setIsLoading(false)
      if(props.dataType === DataType.TOTALDONATED){
        setValue(response.data.valueUsd)
        setCurrentValue(response.data.valueUsd)
      }
      else if(props.dataType === DataType.PROJECTSCREATED){
        setValue(response.data.totalProjects)
        setCurrentValue(response.data.totalProjects)
      }
    })
    .catch(function (error) {
      setIsLoading(false)
      setIsError(true)
    })
    api.get(props.endpointData+'?fromDate='+props.fromDate+'&toDate='+props.toDate)
    .then(function (response) {
      if(props.dataType === DataType.TOTALDONATED){
        const labels = []
        const chartsData = []
        
        response.data.totalDonations.map((donation)=>{
          labels.push(formatLabelDate(donation.date))
          chartsData.push(donation.totalDonated)
          setData({
            labels,
            datasets: [
              {
                data: chartsData,
                borderSkipped: false,
                backgroundColor: '#5D5FEF',
                borderRadius: 8,
              },
            ],
          })
        })
      }
      else if(props.dataType === DataType.PROJECTSCREATED){
        const labels = []
        const chartsData = []
        response.data.result.map((projects)=>{
          labels.push(formatLabelDate(projects.date))
          chartsData.push(projects.count)
          setData({
            labels,
            datasets: [
              {
                data: chartsData,
                borderSkipped: false,
                backgroundColor: '#5D5FEF',
                borderRadius: 8,
              },
            ],
          })
        })
      }
    })
  },[props.fromDate])



    return(
      <div>
        <TitleH1 weight={700}>{props.title}</TitleH1>
        <ChartContainer>
          {isLoading && 
            <Skeleton height={300} highlightColor={brandColors.giv[600]} baseColor={brandColors.giv[700]}/>
          }
          {isError &&
                <ErrorContainer>
                  <ErrorMessage>
                    Data is currently not available
                  </ErrorMessage>
                </ErrorContainer>
          }
          {!isLoading && !isError && 
            <>
                <KPICard>
                  <Content>
                    <TitleKPI>{props.kpiTitle}</TitleKPI>
                    {isLoading && 
                      <Skeleton height={42} highlightColor={brandColors.giv[600]} baseColor={brandColors.giv[700]}/>
                    }
                    {isError &&
                      <Value>
                        <Number>-</Number>
                      </Value>
                    }
                    {!isLoading && !isError && props.currency &&
                      <Value>
                        <Number>{formatDollarAmount(currentValue, 2, true)}</Number>
                      </Value>
                    }
                    {!isLoading && !isError && !props.currency &&
                      <Value>
                        <Number>{currentValue}</Number>
                      </Value>
                    }
                  </Content>
                </KPICard>
              <Bar options={options} data={data}/>
            </>
          }
        </ChartContainer>
      </div>
    )
  }
  
const TitleH1 = styled(H4)`
  margin-bottom: 30px;
`

const ChartContainer = styled.div`
  background-color: ${brandColors.giv[700]};
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 285px;
`

const ErrorMessage = styled(P)`
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  color: ${brandColors.deep[100]};
  text-align: center;
`

const KPICard = styled.div`
background-color:${brandColors.giv[700]};
height: 100px;
width: 100%;
border-radius: 8px;
`

const Content = styled.div`
padding: 18px 24px;
`

const Value = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`

const TitleKPI = styled(P)`
font-weight: 400;
font-size: 14px;
line-height: 21px;
color: ${brandColors.deep[100]}
`

const Number = styled(P)`
font-weight: 700;
font-size: 32px;
line-height: 42px;
`