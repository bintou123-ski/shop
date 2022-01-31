import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const ChekoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Nav className="justify-content-center mb-4">
			<Nav.Item>
				{step1 ? (
					<LinkContainer to="/login">
						<Nav.Link>Sign in</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Sign in </Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step2 ? (
					<LinkContainer to="/shipping">
						<Nav.Link>Delivery</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Deliver </Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step3 ? (
					<LinkContainer to="/payment">
						<Nav.Link>Payment</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Payment </Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step4 ? (
					<LinkContainer to="/placeorder">
						<Nav.Link>Order</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Order </Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};
export default ChekoutSteps;
