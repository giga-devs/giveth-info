import styled from 'styled-components';
import { brandColors, P } from '@giveth/ui-design-system';

export const KPICard = styled.div`
  background-color: ${brandColors.giv[700]};
  height: 100px;
  width: 100%;
  border-radius: 8px;
`;

export const Content = styled.div`
  padding: 18px 24px;
`;

export const Value = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(P)`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${brandColors.deep[100]};
`;

export const Number = styled(P)`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
`;
