import styled from "styled-components";
import tw from "tailwind-styled-components";
import LoginBg from "../../asset/jigsaw.svg"
import Board from "../shared/Board";

const ScreenBg = styled.div`
	background-image: url(${LoginBg});
`

const Screen = tw(ScreenBg)`
	min-h-full bg-orange-200 flex flex-col justify-center items-center
`

const Container = tw.div`
	container
	px-4
	mx-auto
`

function AuthLayout({children}) {
	return (
	<Screen>
		<Container>
			<Board>
				{children}
			</Board>
		</Container>
	</Screen>
	);
}

export default AuthLayout;