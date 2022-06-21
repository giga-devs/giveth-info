import React, { useState, useEffect } from "react"
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
import styled from "styled-components"
import { H4, brandColors } from "@giveth/ui-design-system"

import { KPI } from "../OverView/KPI"


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function DonationChart(){
  const [totalDonated, setTotalDonated] = useState(0)
  const [currentTotalDonated, setCurrentTotalDonated] = useState(0)
  
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
        setCurrentTotalDonated(item[0].element.$context.raw);
      }
      else {
        setCurrentTotalDonated(totalDonated)
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
    fetch('http://localhost:3000/api/total-donated')
      .then(response => response.json())
      .then(data => {
        setTotalDonated(data.value)
        setCurrentTotalDonated(data.value)
      })
  },[])

    return(
      <div>
        <TitleH1 weight={700}>Donations</TitleH1>
        <ChartContainer>
          <KPI title='Total Donated'value={currentTotalDonated} currency={true}/>
          <Bar options={options} data={data} />
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
