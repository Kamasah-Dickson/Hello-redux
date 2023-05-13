import { useDispatch, useSelector } from "react-redux";
import { allTodos, iscompleted } from "./todoSlice";
import { useState } from "react";
import { addTodo, removeTodo } from "./todoSlice";
import { nanoid } from "@reduxjs/toolkit";
import "./todo.scss";

const Todo = () => {
	const [todo, setTodo] = useState({
		id: nanoid(),
		completed: false,
		task: "",
	});
	const dispatch = useDispatch();

	const todos = useSelector(allTodos);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const save = () => {
		if (!todo.task) {
			return;
		} else {
			dispatch(addTodo(todo));
			setTodo((prev) => ({ ...prev, task: "" }));
		}
	};

	const disable = Boolean(todo.task);

	return (
		<div id="form">
			<form onSubmit={handleSubmit}>
				<input
					maxLength={25}
					type="text"
					name="task"
					value={todo.task}
					placeholder="Enter a todo..."
					onChange={(e) =>
						setTodo((prev) => ({ ...prev, task: e.target.value }))
					}
				/>
				<button disabled={!disable} onClick={save} type="submit">
					Add Task
				</button>
			</form>
			<div className="todos">
				{todos.map((todo) => {
					return (
						<div className="todo" key={todo.id}>
							{todo.completed ? <s>{todo.task}</s> : todo.task}
							<div className="buttons">
								<button
									onClick={() => dispatch(removeTodo(todo.id))}
									type="button"
									className="remove"
								>
									Remove
								</button>
								<button
									onClick={() => dispatch(iscompleted(todo.id))}
									type="button"
									className="completed"
								>
									{!todo.completed ? "👍" : "👎"}
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Todo;
