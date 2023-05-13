import { useDispatch, useSelector } from "react-redux";
import { addPost, allPosts, deletePost } from "./postSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { reactionAdded } from "../posts/postSlice";

const Post = () => {
	const dispatch = useDispatch();
	const allPost = useSelector(allPosts);
	const [inputValues, setInputValues] = useState({
		title: "",
		message: "",
		name: "",
	});
	const { title, message, name } = inputValues;
	let disabled = Boolean(title) && Boolean(message) && Boolean(name);

	const handleValues = (e) => {
		setInputValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const newPost = {
		id: nanoid(),
		user: inputValues.name,
		title: inputValues.title,
		message: inputValues.message,
		reactions: {
			happy: 0,
			sad: 0,
			thumb: 0,
			love: 0,
		},
	};

	function onSave() {
		if (title && message) {
			dispatch(addPost(newPost));
			setInputValues((prev) => ({ ...prev, title: "", message: "", name: "" }));
		}
	}

	const reactions = {
		happy: "😊",
		sad: "😢",
		thumb: "👍",
		love: "💗",
	};

	function emojis(index, id) {
		return Object.entries(reactions).map(([name, emoji]) => {
			return (
				<button
					onClick={() => dispatch(reactionAdded({ id: id, reaction: name }))}
					key={name}
					type="button"
				>
					{emoji}
					{allPost[index].reactions[name]}
				</button>
			);
		});
	}

	return (
		<div className="flex">
			<div className="postInputs">
				<input
					onChange={(e) => handleValues(e)}
					type="text"
					name="title"
					value={inputValues.title}
					placeholder="Title"
				/>
				<select
					onChange={(e) =>
						setInputValues((prev) => ({ ...prev, name: e.target.value }))
					}
					name="name"
					value={inputValues.name}
				>
					<option value="">---</option>
					<option value="Kamasah Dickson">Kamasah Dickson</option>
					<option value="Daniel Mensah">Daniel Mensah</option>
					<option value="Isaac Newton">Isaac Newton</option>
				</select>
				<input
					onChange={(e) => handleValues(e)}
					type="text"
					name="message"
					value={inputValues.message}
					placeholder="What's up today"
				/>
				<button disabled={!disabled} onClick={onSave} type="button">
					Create new post
				</button>
			</div>
			<div className="posts">
				{allPost?.map((post, index) => (
					<div className="singlePost" key={post.id}>
						<h1>{post.title}</h1>
						<h2>{post.message}</h2>
						<p>{emojis(index, post.id)}</p>
						<span>{post.user}</span>
						<button
							onClick={() => dispatch(deletePost(post.id))}
							className="delete"
							type="button"
						>
							Delete Post
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Post;
