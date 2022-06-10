import Head from 'next/head';
import styled from 'styled-components';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { OverView } from '../components/OverView/Overview';
import { Charts } from '../components/Charts/Charts';
import { LeaderBoard } from '../components/LeaderBoard/LeaderBoard';
import  { mediaQueries } from "../utils/size"

import { createServer } from 'miragejs'

createServer({
  routes(){
    this.namespace = 'api';

    this.get('/total-donated', () =>{
      return {
        'start-date': '21/02/2022',
        'end-date': '15/05/2022',
        'value': 24834
      }
    })

    this.get('/donors', () =>{
      return {
        'start-date': '21/02/2022',
        'end-date': '15/05/2022',
        'value': 365
      }
    })

    this.get('/projects', () =>{
      return {
        'start-date': '21/02/2022',
        'end-date': '15/05/2022',
        'value': 175
      }
    })

    this.get('/top-donation', () =>{
      return {
        'date': '21/02/2022',
        'value': 3200
      }
    })

    this.get('/top-donations', () => {
      return [
          {
            'id': 1,
            'adress': '0xd41a333d7fe141',
            'quantity': 43,
            'value': 3200000
          },
          {
            'id': 2,
            'adress': '0xd411233d7fe1411414214',
            'quantity': 32,
            'value': 2300
          },
          {
            'id': 3,
            'adress': '0xd41dsef33d7fe1411414214',
            'quantity': 12,
            'value': 2100
          },
          {
            'id': 4,
            'adress': '02x41a243d7fe1411414214',
            'quantity': 23,
            'value': 1900
          },
          {
            'id': 5,
            'adress': '02x41a243d7fe1411414214',
            'quantity': 23,
            'value': 1900
          },
          {
            'id': 6,
            'adress': '02x41a243d7fe1411414214',
            'quantity': 23,
            'value': 1900
          },
          {
            'id': 7,
            'adress': '02x41a243d7fe1411414214',
            'quantity': 23,
            'value': 1900
          }
        ]
      })

      this.get('/top-projects', () => {
        return [
            {
              'id': 11,
              'name': 'Project 1',
              'donors': 43,
              'raised': 3200
            },
            {
              'id': 12,
              'name': 'Project 2',
              'donors': 12,
              'raised': 3042
            },
            {
              'id': 13,
              'name': 'Project 3',
              'donors': 30,
              'raised': 2395
            },
            {
              'id': 14,
              'name': 'Project 4',
              'donors': 15,
              'raised': 1598
            },
            {
              'id': 15,
              'name': 'Project 5',
              'donors': 15,
              'raised': 1298
            },
            {
              'id': 16,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 17,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 18,
              'name': 'Project 1',
              'donors': 43,
              'raised': 3200
            },
            {
              'id': 19,
              'name': 'Project 2',
              'donors': 12,
              'raised': 3042
            },
            {
              'id': 20,
              'name': 'Project 3',
              'donors': 30,
              'raised': 2395
            },
            {
              'id': 21,
              'name': 'Project 4',
              'donors': 15,
              'raised': 1598
            },
            {
              'id': 22,
              'name': 'Project 5',
              'donors': 15,
              'raised': 1298
            },
            {
              'id': 23,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 24,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 25,
              'name': 'Project 1',
              'donors': 43,
              'raised': 3200
            },
            {
              'id': 26,
              'name': 'Project 2',
              'donors': 12,
              'raised': 3042
            },
            {
              'id': 27,
              'name': 'Project 3',
              'donors': 30,
              'raised': 2395
            },
            {
              'id': 28,
              'name': 'Project 4',
              'donors': 15,
              'raised': 1598
            },
            {
              'id': 29,
              'name': 'Project 5',
              'donors': 15,
              'raised': 1298
            },
            {
              'id': 30,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 31,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 32,
              'name': 'Project 1',
              'donors': 43,
              'raised': 3200
            },
            {
              'id': 33,
              'name': 'Project 2',
              'donors': 12,
              'raised': 3042
            },
            {
              'id': 34,
              'name': 'Project 3',
              'donors': 30,
              'raised': 2395
            },
            {
              'id': 35,
              'name': 'Project 4',
              'donors': 15,
              'raised': 1598
            },
            {
              'id': 36,
              'name': 'Project 5',
              'donors': 15,
              'raised': 1298
            },
            {
              'id': 37,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 38,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 39,
              'name': 'Project 1',
              'donors': 43,
              'raised': 3200
            },
            {
              'id': 40,
              'name': 'Project 2',
              'donors': 12,
              'raised': 3042
            },
            {
              'id': 41,
              'name': 'Project 3',
              'donors': 30,
              'raised': 2395
            },
            {
              'id': 42,
              'name': 'Project 4',
              'donors': 15,
              'raised': 1598
            },
            {
              'id': 43,
              'name': 'Project 5',
              'donors': 15,
              'raised': 1298
            },
            {
              'id': 44,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
            {
              'id': 45,
              'name': 'Project 6',
              'donors': 12,
              'raised': 1198
            },
          ]
        })

  }
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Giveth Info</title>
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>
      <Container>
        <Header />
        <Content>
          <OverView/>
          <Charts/>
          <LeaderBoard/>
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
  height: 100%;
  display: grid;
  margin: 0 160px;
  row-gap: 30px;
  margin-top: 32px;
  margin-bottom: 72px;

  
  ${mediaQueries.mobileL} {
    margin: 0 40px;
  }

  ${mediaQueries.tablet} {
    margin: 0 80px;
  }
  
  ${mediaQueries.desktop} {
    margin: 0 160px;
	}

`