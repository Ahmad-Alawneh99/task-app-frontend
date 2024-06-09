import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import Task from "../components/Task";
import { TaskData } from "../shared/interfaces.d";
import { getAuthCookie } from "../shared/utils";


const TasksPage = () => {
	const [tasks, setTasks] = useState<TaskData[]>([]);
	const navigate = useNavigate();

	const navigateToAddTaskPage = () => {
		navigate('/add-task');
	}

	const signOut = () => {
		document.cookie = 'task_app_token=';
		navigate('/sign-in');
	}

	const onTaskDelete = (taskId: string) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	}

	useEffect(() => {
		if (!getAuthCookie()) {
			navigate('/sign-in');

			return;
		}

		const prepareData = async () => {
			const response = await fetch('http://localhost:3030/tasks/getAll', {
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			const data = await response.json();

			setTasks(data.tasks);
		}

		prepareData();
	}, [navigate]);

	return (
		<PageLayout>
			<div className="tasks-container">
				<div className="tasks-navbar">
					<p className="tasks-title">Your tasks</p>
					<div className="control-buttons">
						<button type="button" className="add-task-button" onClick={navigateToAddTaskPage}>Add task</button>
						<button type="button" className="sign-out-button" onClick={signOut}>Sign out</button>
					</div>
				</div>
				{
					!!tasks.length &&
					<div className="task-list">
						{tasks.map((task) => <Task task={task} key={task.id} onTaskDelete={onTaskDelete}/>)}
					</div>
				}
				{ !tasks.length && <p className="no-tasks">You don't have any tasks, start by adding one</p> }
			</div>
		</PageLayout>
	);
}

export default TasksPage;
