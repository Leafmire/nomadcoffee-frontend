import { logUserIn } from "../apollo";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { Link, useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/shared/Button";
import Input from "../components/shared/Input";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/Formerror";
import { gql, useMutation } from "@apollo/client";

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

const InputContainer = styled.div`
	margin-bottom: 1.5rem;
`
const Label = tw.label`
	block
	mb-2
	font-bold
`
const Notification = tw.div`
	text-green-500
	font-bold
`

const LOGIN_MUTATION = gql`
	mutation login($username:String!, $password:String!)
	{
		login(username: $username, password: $password) {
			ok
			token
			error
		}
	}
`

function Login() {
	const location = useLocation();
	const { register, handleSubmit, formState: { errors, isValid }, getValues, setError, clearErrors } = useForm({
		mode: 'onChange',
		defaultValues: {
			username: location?.state?.username || "",
			password: location?.state?.password || ""
		}
	});
	const onCompleted = (data) => {
		const {login: {ok, error, token}} = data;
		if (!ok) {
			return setError("result", {
				message: error
			})
		}
		if (token) {
			logUserIn(token);
		}
	}
	const [login, { loading }] = useMutation(LOGIN_MUTATION, {
		onCompleted
	})
	const onSubmitValid = () => {
		if (loading) {
			return;
		}
		const {username, password} = getValues();
		login({
			variables: {username, password}
		})
	};
	const clearLoginError = () => {
		clearErrors("result")
	}
	return (
		<AuthLayout>
			<PageTitle title="Login" />
			<Logo href="/">
				Nomad Coffee
			</Logo>
			<Title>
				Sign in
			</Title>
			<SubTextOrange>
				Need more Cafe-in
			</SubTextOrange>
			<Notification>{location?.state?.message}</Notification>
			<Form onSubmit={handleSubmit(onSubmitValid)}>
				<InputContainer>
					<Label htmlFor="username">Username</Label>
					<Input {...register("username",
						{
							required: "Username is required",
							minLength: {
								value: 3,
								message: "Username should be longer than 5."
							},
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
					<Input {...register("password",
						{
							required: "Password is required"
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
					<Link to="/" className="text-lg font-bold text-stone-900">Forgot your password?</Link>
				</InputContainer>
				<InputContainer>
					<SubmitButton type="submit" value={loading ? "Loading..." : "Sign in"} disabled={!isValid || loading}>
						{loading ? "Loading..." : "Sign in"}
					</SubmitButton>
				</InputContainer>
				<FormError message={errors?.result?.message} />
				<InputContainer>
					<SubText>Don’t have an account?</SubText> <Link to="/sign-up" className="text-lg font-bold text-orange-800">Sign up</Link>
				</InputContainer>
			</Form>
		</AuthLayout>
	);
}

export default Login