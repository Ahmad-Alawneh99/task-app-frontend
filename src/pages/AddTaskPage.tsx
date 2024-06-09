import { useCallback, useEffect, useRef, useState } from "react";
import PageLayout from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import { getAuthCookie } from "../shared/utils";

const AddTaskPage = () => {
	const [error, setError] = useState({ isError: false, message: '' });
	const [isSubmitting, setSubmitting] = useState(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const completedRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const handleSubmit = useCallback(async () => {
		setSubmitting(true);
		const data = {
			title: titleRef.current?.value || '',
			description: descriptionRef.current?.value || '',
			completed: completedRef.current?.checked,
		};

		try {
			const response = await fetch('http://localhost:3030/tasks/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			});

			const responseData = await response.json();

			if (responseData.success) {
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

	useEffect(() => {
		if (!getAuthCookie()) {
			navigate('/sign-in');

			return;
		}
	})

	return (
		<PageLayout>
			<form className="form-container">
				<p className="form-title">Add a task</p>
				<input className="simple-input" type="text" title="title" placeholder="Task title" ref={titleRef}/>
				<textarea className="simple-input" title="description" placeholder="Task description" ref={descriptionRef}/>
				<div className="checkbox-section">
					<input type="checkbox" title="completed" id="completed" ref={completedRef}/>
					<label htmlFor="completed">Completed</label>
				</div>
				<button
					type="button"
					className="form-submit-button"
					disabled={isSubmitting}
					onClick={handleSubmit}
				>Add a task</button>
				{error.isError && <p className="form-error">{error.message}</p>}
			</form>
		</PageLayout>
	);
}

export default AddTaskPage;
