import {
	allProducts,
	add,
	remove,
	updateCount,
	increment,
	decrement,
} from "../features/Ecommerce/commerce";
import "../scss/main.scss";
import { useSelector, useDispatch } from "react-redux";
import { commerce } from "../Data";

function Commerce() {
	const dispatch = useDispatch();
	const cartProducts = useSelector(allProducts);

	function getCount(id) {
		let specificProduct = cartProducts?.find((product) => product.id === id);
		if (specificProduct) {
			return specificProduct.numberOfItems || 0;
		}
	}

	let totalPrice = 0;

	cartProducts.forEach((element) => {
		return (totalPrice += element.price * element.numberOfItems);
	});

	function handleInput(value, id) {
		if (value == 0) {
			dispatch(remove(id));
		} else {
			dispatch(
				updateCount({
					id,
					count: Number(value),
				})
			);
		}
	}

	function handleDecrease(id) {
		const product = cartProducts.find((p) => p.id === id);

		if (product.numberOfItems === 1) {
			dispatch(remove(id));
		} else {
			dispatch(decrement(id));
		}
	}

	return (
		<>
			<div className="left">
				{commerce.map((products) => {
					return (
						<div key={products.id} className="card">
							<img src={products.image} alt="" />
							{getCount(products.id) && (
								<div className="top">{getCount(products.id)}</div>
							)}
							<h2>Price:{products.price}</h2>
							<div>
								<button
									onClick={() => dispatch(add(products.id))}
									type="button"
								>
									Add to cart
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className="right">
				{cartProducts.length > 0 && <h1>Total:{totalPrice.toFixed(2)}</h1>}
				{cartProducts.map((products) => {
					return (
						<div key={products.id} className="card">
							<button
								type="button"
								onClick={() => dispatch(remove(products.id))}
							>
								Remove
							</button>
							<img src={products.image} alt="" />
							{products.numberOfItems && (
								<div className="top">{products.numberOfItems}</div>
							)}
							<h2>Price:{products.price}</h2>
							<div className="buttonFlex">
								<div>
									<div className="input">
										<button
											type="button"
											onClick={() => handleDecrease(products.id)}
										>
											-
										</button>
										<input
											type="text"
											onChange={(e) => handleInput(e.target.value, products.id)}
											name=""
											value={Number(products.numberOfItems)}
										/>
										<button
											type="button"
											onClick={() => dispatch(increment(products.id))}
										>
											+
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Commerce;
