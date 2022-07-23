import Head from 'next/head';
import styled from 'styled-components';

import { Footer } from '../src/components/Footer';
import { Header } from '../src/components/Header';
import { OverView } from '../src/components/OverView/Overview';
import { Charts } from '../src/components/Charts/Charts';
import { LeaderBoard } from '../src/components/LeaderBoard/LeaderBoard';
import  { mediaQueries } from "../src/utils/size"
import { useState } from 'react';

export interface Date{
  fromDate: string
  toDate: string
}

export default function Home() {
  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState('')
  return (
    <>
      <Head>
        <title>Giveth Info</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Container>
        <Header />
        <Content>
          <OverView fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate}/>
          <Charts fromDate={fromDate} toDate={toDate}/>
          <LeaderBoard fromDate={fromDate} toDate={toDate}/>
        </Content>
        <Footer />
      </Container>
    </>
  )
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  padding-top: 32px;
  padding-bottom: 72px;

  
  ${mediaQueries.mobileS} {
    margin: 0 40px;
  }

  ${mediaQueries.tablet} {
    margin: 0 80px;
  }
  
  ${mediaQueries.desktop} {
    margin: 0 160px;
	}

`