import Image from "next/image";
import styled from "styled-components";
import { brandColors, neutralColors, H5 } from "@giveth/ui-design-system";


export function Header() {
  return (
    <Container>
      <Logo>
        <Image
          width='50px'
          height='50px'
          alt='Giveth logo'
          src={`/images/GivethLogo.png`}
        />
      </Logo>
      <Title>
        <H5 weight={700}>Giveth Info</H5>
      </Title>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  align-items: center;
  background-color:${brandColors.giv[700]};
  padding: 25px 40px;
`

const Logo = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${neutralColors.gray[100]};
	border-radius: 99px;
	padding: 8px;
	width: 64px;
	height: 64px;
`;

const Title = styled.div`
  margin: 0px 40px;
`

