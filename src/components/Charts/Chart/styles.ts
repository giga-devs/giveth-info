import styled from 'styled-components';
import { H4, brandColors, P } from '@giveth/ui-design-system';

export const TitleH1 = styled(H4)`
  margin-bottom: 30px;
`;

export const ChartContainer = styled.div`
  background-color: ${brandColors.giv[700]};
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 285px;
`;

export const ErrorMessage = styled(P)`
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  color: ${brandColors.deep[100]};
  text-align: center;
`;

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

export const TitleKPI = styled(P)`
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
