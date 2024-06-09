import { useCallback, useRef, useState } from "react";
import PageLayout from "../components/PageLayout";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
	const [error, setError] = useState({ isError: false, message: '' });
	const [isSubmitting, setSubmitting] = useState(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const handleSubmit = useCallback(async () => {
		setSubmitting(true);
		const data = {
			name: nameRef.current?.value || '',
			email: emailRef.current?.value || '',
			password: passwordRef.current?.value || '',
		};

		try {
			const response = await fetch('http://localhost:3030/users/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.json();

			if (responseData.success) {
				document.cookie = `task_app_token=${responseData.token}`;
				navigate('/');
			} else {
				setError({
					isError: true,
					message: responseData.message,
				});
			}
		} catch (error: any) {
			setError({
				isError: true,
				message: error.message,
			});
		}
		setSubmitting(false);
	}, [navigate]);

	return (
		<PageLayout>
			<form className="form-container">
				<p className="form-title">Sign up</p>
				<input className="simple-input" type="text" title="Name" placeholder="Name" ref={nameRef}/>
				<input className="simple-input" type="email" title="Email" placeholder="Email" ref={emailRef}/>
				<input className="simple-input" type="password" title="Password" placeholder="Password" ref={passwordRef}/>
				<button
					type="button"
					className="form-submit-button"
					disabled={isSubmitting}
					onClick={handleSubmit}
				>Sign up</button>
				{error.isError && <p className="form-error">{error.message}</p>}
			</form>
		</PageLayout>
	);
}

export default SignUpPage;
