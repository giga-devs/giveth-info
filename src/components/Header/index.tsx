import Image from 'next/image';
import { H5 } from '@giveth/ui-design-system';
import { Container, Logo, Title } from './styles';

export function Header() {
  return (
    <Container>
      <Logo>
        <Image
          width="50px"
          height="50px"
          alt="Giveth logo"
          src="/images/GivethLogo.png"
        />
      </Logo>
      <Title>
        <H5 weight={700}>Giveth Info</H5>
      </Title>
    </Container>
  );
}
