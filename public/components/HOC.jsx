import React from 'react';

// This function takes a component...
function buildBoard(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends WrappedComponent {
    constructor(props) {
      super(props);
      this.state = {
        data: 'original data',
        one: 'one'
      };

      this.testFunc = this.testFunc.bind(this);
      
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      console.log('mounting');
      this.setState({
        data: "component did mount"
      })
    }

    componentWillUnmount() {
      console.log('unmounting');
      this.setState({
        data: 'component did unmount'
      })
    }

    testFunc() {
      this.setState({
        data: selectData
      });
    }

    proc(wrappedComponentInstance) {
      if (wrappedComponentInstance) {
        console.log('wrappedComponentInstance:', wrappedComponentInstance);
        wrappedComponentInstance.setState({
          data: 'setState data'
        })
      }
      
    }

    render() {
      console.log('HOC props:', this.props);
      const props = Object.assign({}, this.props, {ref: this.proc.bind(this)})
      console.log('props within render: ', this.props);
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <div style={{color: 'red'}}>
          <WrappedComponent data={this.state.data} {...props} />;
        </div>
        )
    }
  };
}
        // <div style={{color: 'red'}}>
          // <WrappedComponent data={this.state.data} {...props} />;
        // </div>

export default buildBoard;