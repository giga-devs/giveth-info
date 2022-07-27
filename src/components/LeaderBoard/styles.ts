import styled from 'styled-components';
import { mediaQueries } from '@/utils/size';

export const BoardsContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: space-between;
  gap: 50px;

  ${mediaQueries.mobileS} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${mediaQueries.laptopL} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
