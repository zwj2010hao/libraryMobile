var Hello = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

module.exports = {
    invoke: function(){
    	ReactDOM.render(
  			<Hello name="World!" />,
  			document.querySelector('body')
		);
	}
}
