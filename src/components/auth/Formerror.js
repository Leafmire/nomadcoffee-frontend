import tw from "tailwind-styled-components";

const SFormError = tw.span`
	inline-block
	text-red-500
	font-bold
	mt-2
`

function FormError({message}) {
	return message === "" || !message ? null : <SFormError>{message}</SFormError>
}

export default FormError;