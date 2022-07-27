import { brandColors, H5, P } from '@giveth/ui-design-system';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { mediaQueries } from '@/utils/size';

export const TableContainer = styled.div`
  ${mediaQueries.mobileS} {
    margin: 0;
    font-size: 14px;
  }

  ${mediaQueries.mobileL} {
    margin: 0 12px;
    font-size: 16px;
  }
`;

export const Title = styled(H5)`
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: ${brandColors.deep[100]};
  margin: 30px 0;
`;

export const Data = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;
  ${mediaQueries.mobileS} {
    grid-template-columns: 1fr 3fr 2fr 2fr;
  }

  ${mediaQueries.desktopL} {
    grid-template-columns: 1fr 2fr 1fr 1fr;
  }
`;

export const HR = styled.hr`
  border: 1px solid ${brandColors.giv[500]};

  ${mediaQueries.mobileS} {
    margin: 16px 0;
  }

  ${mediaQueries.mobileL} {
    margin: 16px 16px;
  }
`;

export const Rows = styled.div`
  display: grid;
  gap: 12px;
`;

export const TableHeader = styled(P)`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-align: center;

  ${mediaQueries.mobileS} {
    font-size: 12px;
  }

  ${mediaQueries.mobileL} {
    font-size: 16px;
  }
`;

export const TableData = styled(P)`
  width: 100%;
  font-weight: 400;
  text-align: center;
  ${mediaQueries.mobileS} {
    font-size: 14px;
  }

  ${mediaQueries.mobileL} {
    font-size: 16px;
  }
`;

export const LinkContainer = styled.a`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries.mobileS} {
    height: 100%;
  }

  ${mediaQueries.laptopL} {
    height: 48px;
  }
`;

export const URL = styled(P)`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: ${brandColors.cyan[600]};

  &:hover {
    text-decoration: underline;
  }

  ${mediaQueries.mobileS} {
    font-size: 14px;
  }

  ${mediaQueries.mobileL} {
    font-size: 16px;
  }
`;

export const ErrorMessage = styled(P)`
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  color: ${brandColors.deep[100]};
  text-align: center;
`;

export const Icon = styled.img`
  width: 12px;
  margin-left: 6px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: end;
`;

export const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  width: 55%;
  font-family: 'Red Hat Text';
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;

  ${mediaQueries.mobileS} {
    width: 100%;
    padding: 0;
  }

  ${mediaQueries.mobileL} {
    width: 100%;
    padding: 0 16px;
  }

  ${mediaQueries.desktop} {
    width: 55%;
  }

  li a {
    padding: 0.2rem 0.2rem;
    color: #bbc3d4;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active {
    border-bottom: 2px solid ${brandColors.giv[500]};
  }
  li.active a {
    color: white;
  }
  li.disabled a {
    color: #fff;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
