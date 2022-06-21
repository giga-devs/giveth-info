import React, { useState, useEffect } from "react"
import { Bar } from 'react-chartjs-2';
import styled from "styled-components"
import { H4, brandColors, P } from "@giveth/ui-design-system"
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function ProjectChart(){
  const [projectsCreated, setProjectsCreated] = useState(0)
  const [currentprojectsCreated, setCurrentProjectsCreated] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
  const data = {
    labels,
    datasets: [
      {
        data: [5435, 45354, 35543, 3554, 25354, 3445, 3455],
        borderSkipped: false,
        backgroundColor: '#5D5FEF',
        borderRadius: 8,
      },
    ],
  };
  const options = {
    onHover: function(evt, item) { 
      if (item.length>0) {
        setCurrentProjectsCreated(item[0].element.$context.raw);
      }
      else {
        setCurrentProjectsCreated(projectsCreated)
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

  useEffect(() => {
    api.get('/projects')
    .then(function (response) {
      setIsLoading(false)
      setProjectsCreated(response.data.value)
      setCurrentProjectsCreated(response.data.value)
    })
    .catch(function (error) {
      setIsLoading(false)
      setIsError(true)
    })
  },[])

  return(
    <div>
      <TitleH1 weight={700}>Projects</TitleH1>
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
                  <TitleKPI>Projects Created</TitleKPI>
                  {isLoading && 
                    <Skeleton height={42} highlightColor={brandColors.giv[600]} baseColor={brandColors.giv[700]}/>
                  }
                  {isError &&
                    <Value>
                      <Number>-</Number>
                    </Value>
                  }
                  {!isLoading && !isError  &&
                    <Value>
                      <Number>{currentprojectsCreated}</Number>
                    </Value>
                  }
                </Content>
              </KPICard>
            <Bar options={options} data={data} />
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