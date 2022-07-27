import styled from 'styled-components';
import { P, brandColors } from '@giveth/ui-design-system';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 44px;

  li {
    list-style: none;
    & + li {
      margin-top: 16px;
    }
  }
`;

export const PStyled = styled(P)`
  color: ${brandColors.deep[100]};
`;
