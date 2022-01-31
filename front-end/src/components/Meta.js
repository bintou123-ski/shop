import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, descripton, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={descripton} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to the store',
	description: 'We sell the best products ',
	keywords: 'Men,women,electronics,house equipment ....'
};

export default Meta;
