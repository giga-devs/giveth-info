import styled from 'styled-components';
import { brandColors, neutralColors } from '@giveth/ui-design-system';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${brandColors.giv[700]};
  padding: 25px 40px;
`;

export const Logo = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${neutralColors.gray[100]};
  border-radius: 99px;
  padding: 8px;
  width: 64px;
  height: 64px;
`;

export const Title = styled.div`
  margin: 0px 40px;
`;
