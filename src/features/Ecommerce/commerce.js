import { createSlice } from "@reduxjs/toolkit";
import { commerce } from "../../Data";

const initialState = [];

const commerceSlice = createSlice({
	name: "commerce",
	reducers: {
		add: (state, action) => {
			const targetProduct = state.find(
				(products) => products.id === action.payload
			);
			if (targetProduct) {
				targetProduct.numberOfItems++;
			} else {
				let readyProduct = commerce.find(
					(products) => products.id === action.payload
				);
				readyProduct = { ...readyProduct, numberOfItems: +1 };
				state.push(readyProduct);
			}
		},
		remove: (state, action) => {
			return state.filter((products) => products.id !== action.payload);
		},
		updateCount: (state, action) => {
			state = state.map((product) => {
				if (product.id === action.payload.id) {
					product.numberOfItems = action.payload.count || product.numberOfItems;
				} else {
					return state;
				}
			});
		},
		increment: (state, action) => {
			state = state.map((product) => {
				if (product.id == action.payload) {
					product.numberOfItems = product.numberOfItems + 1;
				} else {
					return state;
				}
			});
		},
		decrement: (state, action) => {
			state.map((product) => {
				if (product.id == action.payload) {
					product.numberOfItems = product.numberOfItems - 1;
				}
			});
		},
	},
	initialState,
});

export default commerceSlice.reducer;
export const allProducts = (state) => state.commerce;
export const { add, remove, updateCount, increment, decrement } =
	commerceSlice.actions;
