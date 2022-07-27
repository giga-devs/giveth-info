import { Container, PStyled } from './styles';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Container>
      <li>
        <PStyled>Made with 💜 by the Giveth Community</PStyled>
      </li>
      <li>
        <PStyled> {currentYear} - No Rights Reserved</PStyled>
      </li>
    </Container>
  );
}
