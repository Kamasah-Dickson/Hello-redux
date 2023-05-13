import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	posts: [],
	status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

export const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost: (state, action) => {
			state.posts.push(action.payload);
		},

		deletePost: (state, action) => {
			state.posts = state.posts.filter((posts) => posts.id !== action.payload);
		},

		reactionAdded: (state, action) => {
			const { id, reaction } = action.payload;
			const existReaction = state.posts.find((emoji) => emoji.id == id);
			if (existReaction) {
				existReaction.reactions[reaction] += 1;
			}
		},
	},
});

export default postSlice.reducer;
export const allPosts = (state) => state.posts.posts;
export const { addPost, deletePost, reactionAdded } = postSlice.actions;
