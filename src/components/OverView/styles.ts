import styled from 'styled-components';
import { H4 } from '@giveth/ui-design-system';
import { mediaQueries } from '../../utils/size';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaQueries.mobileS} {
    align-items: start;
    flex-direction: column-reverse;
  }
  ${mediaQueries.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  ${mediaQueries.mobileS} {
    justify-content: center;
    margin-bottom: 20px;
  }
  ${mediaQueries.tablet} {
    justify-content: end;
    margin-bottom: 0;
  }
`;

export const KPIContainer = styled.div`
  margin-top: 30px;
  display: grid;
  width: 100%;
  justify-content: space-between;
  gap: 50px;

  ${mediaQueries.mobileS} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${mediaQueries.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mediaQueries.laptopL} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Title = styled(H4)`
  width: 100%;
`;
