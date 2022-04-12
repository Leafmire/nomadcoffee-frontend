import tw from "tailwind-styled-components";

const Board = tw.div`
	py-12 px-6 md:p-16 border-4 border-stone-900
	shadow-bold bg-white rounded-2xl max-w-2xl mx-auto
	flex flex-col justify-center items-center
`
function WhiteBoard({children}) {
	return (
		<Board>
			{children}
		</Board>
	)
}

export default WhiteBoard;

