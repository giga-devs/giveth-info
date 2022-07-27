import Head from 'next/head';
import styled from 'styled-components';

import { Charts } from '@/components/Charts';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { OverView } from '@/components/OverView';
import { LeaderBoard } from '@/components/LeaderBoard';
import { RoundProvider } from '@/RoundContext';
import { mediaQueries } from '@/utils/size';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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
`;

export default function Home() {
  return (
    <RoundProvider>
      <Head>
        <title>Giveth Info</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Container>
        <Header />
        <Content>
          <OverView />
          <Charts />
          <LeaderBoard />
        </Content>
        <Footer />
      </Container>
    </RoundProvider>
  );
}
