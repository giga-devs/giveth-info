import { P, brandColors } from "@giveth/ui-design-system";
import styled from "styled-components";

export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <Container>
      <li>
        <PStyled>Made with 💜 by the Giveth Community</PStyled>
      </li>
      <li>
        <PStyled> {currentYear} - No Rights Reserved</PStyled>
      </li>
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 44px;

  li {
    list-style: none;
      & + li{
        margin-top:16px;
      }
  }

`

const PStyled = styled(P)`
  color: ${brandColors.deep[100]};
`
