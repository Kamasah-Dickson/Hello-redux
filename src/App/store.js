import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import todoReducer from "../features/Todos/todoSlice";
export const store = configureStore({
	reducer: {
		posts: postReducer,
		todo: todoReducer,
	},
});
