import tw from "tailwind-styled-components";

const SubmitButton = tw.button`
	w-full px-6 py-4 text-lg font-bold text-white bg-orange-800 rounded shadow-bold
	${props => props.disabled ? "opacity-50" : "opacity-100"}
`

export default SubmitButton;

