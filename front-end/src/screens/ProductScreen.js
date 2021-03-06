import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col, Button, ListGroup, Card, Image, Form } from 'react-bootstrap';
import Rating from '../components/Rating';

import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
const ProductScreen = ({ history, match }) => {
	const [ qty, setQty ] = useState(1);
	const [ rating, setRating ] = useState(0);
	const [ comment, setComment ] = useState('');
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order } = orderDetails;
	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const { success: successProductReview, error: errorProductReview } = productReviewCreate;

	useEffect(
		() => {
			if (successProductReview) {
				alert('Revue Soumis');
				setRating(0);
				setComment('');
				dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
			}
			dispatch(listProductDetails(match.params.id));
		},
		[ dispatch, match, userInfo, history, successProductReview ]
	);
	const addToClickHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment
			})
		);
	};
	return (
		<div>
			<Link to="/" className="btn btn-info my-3">
				Retour
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div>
					<Meta title={product.name} />
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>

						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>{product.name}</h2>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating value={product.rating} text={`${product.numReviews} revues`} />
								</ListGroup.Item>
								<ListGroup.Item>Prix: {product.price} FCFA</ListGroup.Item>
								<ListGroup.Item>description: {product.description}</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<Row>
											<Col>Prix:</Col>
											<Col>
												<strong>{product.price} FCFA</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Statut</Col>
											<Col>{product.countInStock > 0 ? 'En Stock' : 'En Rupture de stock'}</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qte</Col>
												<Col>
													<Form.Control
														as="select"
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[ ...Array(product.countInStock).keys() ].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Button
											onClick={addToClickHandler}
											className="btn-block"
											type="button"
											disabled={product.countInStock === 0}
										>
											Add in Shopping Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<h2>Comment</h2>
							{product.reviews.length === 0 && <Message>pas de revue</Message>}
							<ListGroup variant="flush">
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>

										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2> client's Comment</h2>
									{errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
									{userInfo && order && order.isPaid && order.isDeliver ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Notation</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="">Choose....</option>
													<option value="1">1- Weak</option>
													<option value="2">2- Passable</option>
													<option value="3">3- Good</option>
													<option value="4">4- Very Good</option>
													<option value="5">5- Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment">
												<Form.Label>COMMENT</Form.Label>
												<Form.Control
													as="textarea"
													row="3"
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												>
													{' '}
												</Form.Control>
											</Form.Group>
											<Button type="submit" variant="primary">
												Comment
											</Button>
										</Form>
									) : (
										<Message>
											Pour laisser un Commentaire connectez-vous et Passez ?? la Caisse pour Payer
											,Si Vous avez d??j?? pay?? Attendez la reception du Colis Pour laisser un
											Commentaire <br />
											Nb: L'administrateur Doit Marquer Comme Delivrer (Cot?? Administration) pour
											Vous permettre de laisser un Commentaire
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
};
export default ProductScreen;
