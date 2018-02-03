import React from 'react';

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      data: 'test data',
      two: 'two'
    }
	}

  componentDidMount() {
    console.log('mounting test');
  }


  render() {
    console.log('inside test component', this.state, this.props)
    return(
      <div>
        <p> test </p>

      </div>
      )
  }
}

export default Test;