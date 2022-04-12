import styled from "styled-components";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/shared/Button";
import Input from "../components/shared/Input";
import routes from "./routes";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/Formerror";

const LogoFont = styled.a`
	font-family: "nomad_logoFont";
`

const Logo = tw(LogoFont)`
	text-4xl
	mb-12
	text-center
	text-stone-900
`

const Title = tw.h2`
	text-3xl
	md:text-4xl
	text-stone-900
	font-extrabold
	mb-2
`
const SubText = tw.span`
	text-lg
	text-stone-900
	font-bold
`

const SubTextOrange = tw(SubText)`
	text-orange-800
`

const Form = tw.form`
	w-full
	mt-6
`

const InputContainer = tw.div`
	mb-6
`
const Label = tw.label`
	block
	mb-2
	font-bold
`

const SIGNUP_MUTATION = gql`
	mutation createAccount($username:String!, $password:String!, $email: String!, $name: String!)
	{
		createAccount(username:$username, password:$password, email:$email, name:$name)
		{
			ok
			error
		}
	}
`

function SignUp() {
	const navigate = useNavigate();

	const { register, handleSubmit, formState: { errors, isValid }, setError, getValues, clearErrors } = useForm({
		mode: 'onChange'
	});
	const onCompleted = (data) => {
		const {username, password} = getValues();
		const {createAccount: {ok, error}} = data;
		if (!ok) {
			return setError("result", {
				message: error
			})
		}
		navigate(routes.home, { state: {message: "Acount created. Please log in.", username, password}});
	}
	const [createAccount, { loading }] = useMutation(SIGNUP_MUTATION, {
		onCompleted
	});
	const onSubmitValid = (data) => {
		if (loading) {
			return;
		}
		createAccount({
			variables: {
				...data
			}
		})
	};
	const clearLoginError = () => {
		clearErrors("result")
	}
	return (
		<AuthLayout>
			<PageTitle title="Sign up" />
			<Logo href="/">
				Nomad Coffee
			</Logo>
			<Title>
				Sign up
			</Title>
			<SubTextOrange>
				Need more Cafe-in
			</SubTextOrange>
			<Form onSubmit={handleSubmit(onSubmitValid)}>
				<InputContainer>
					<Label htmlFor="username">Username</Label>
					<Input
					{...register("username",
					{
						required: "Username is required",
					})}
					onFocus={clearLoginError}
					id="username" 
					name="username" 
					type="text" 
					placeholder="Username"
					hasError={Boolean(errors?.username?.message)}></Input>
					<FormError message={errors?.username?.message} />
				</InputContainer>
				<InputContainer>
					<Label htmlFor="password">Password</Label>
					<Input 
					{...register("password",
					{
						required: "Password is required",
					})}
					onFocus={clearLoginError}
					id="password" 
					name="password" 
					type="password" 
					placeholder="Password"
					hasError={Boolean(errors?.password?.message)}></Input>
					<FormError message={errors?.password?.message} />
				</InputContainer>
				<InputContainer>
					<Label htmlFor="email">Email</Label>
					<Input
					{...register("email",
					{
						required: "Email is required",
					})}
					onFocus={clearLoginError}					
					id="email" 
					name="email" 
					type="email" 
					placeholder="Email"
					hasError={Boolean(errors?.email?.message)}></Input>
					<FormError message={errors?.email?.message} />
				</InputContainer>
				<InputContainer>
					<Label htmlFor="name">Name</Label>
					<Input
					{...register("name",
					{
						required: "Name is required",
					})}
					onFocus={clearLoginError}					
					id="name" 
					name="name" 
					type="text" 
					placeholder="Name"
					hasError={Boolean(errors?.name?.message)}></Input>
					<FormError message={errors?.name?.message} />
				</InputContainer>
				<InputContainer>
					<SubmitButton type="submit" value={loading ? "Loading..." : "Sign up"} disabled={!isValid || loading}>
						{loading ? "Loading..." : "Sign up"}
					</SubmitButton>
				</InputContainer>
				<FormError message={errors?.result?.message} />
				<InputContainer>
					<SubText>Have an account?</SubText> <Link to={routes.home} className="text-lg font-bold text-orange-800">Sign in</Link>
				</InputContainer>
			</Form>
		</AuthLayout>
	);
}

export default SignUp