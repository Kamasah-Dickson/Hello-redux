import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
		id: "3232",
		completed: false,
		task: "Cook rice",
	},
	{
		id: "3432",
		completed: false,
		task: "Wash the clothes",
	},
];

const todoSlice = createSlice({
	name: "todo",
	reducers: {
		addTodo: (state, action) => {
			state.push(action.payload);
		},
		removeTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload);
		},
		iscompleted: (state, action) => {
			const todo = state.find((todo) => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
	},
	initialState,
});

export default todoSlice.reducer;
export const allTodos = (state) => state.todo;
export const { addTodo, removeTodo, iscompleted } = todoSlice.actions;
