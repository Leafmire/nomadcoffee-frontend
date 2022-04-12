import tw from "tailwind-styled-components";

const Input = tw.input`
	inline-block
	w-full p-4 
	font-bold
	text-lg placeholder-stone-300 bg-white shadow-bold rounded 
	border-2 focus:outline-none
	${(props) => props.hasError ? "border-red-500" : "border-stone-900"}
`

export default Input;