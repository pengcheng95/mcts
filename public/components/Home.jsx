import React from 'react';
import HOC from './HOC.jsx';
import Test from './Test.jsx';

const Home = (props) => {
		const Testing = HOC(Test, 'selectData');
	return(
		
		<div>
			<h3> Home </h3>
			<h6> Text </h6>
			<Testing testing={' i want to see if you can pass props in here '}/>
		</div>)
}

export default Home;