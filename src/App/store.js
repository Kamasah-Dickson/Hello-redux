import { configureStore } from "@reduxjs/toolkit";
// import postReducer from "../features/posts/postSlice";
// import todoReducer from "../features/Todos/todoSlice";
import commerceReducer from "../features/Ecommerce/commerce";
export const store = configureStore({
	reducer: {
		// posts: postReducer,
		// todo: todoReducer,
		commerce: commerceReducer,
	},
});
