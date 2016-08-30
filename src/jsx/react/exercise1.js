var Divider = React.createClass({
	handleClick:function(event){
		//console.log(event)
	},
	render:function(){
		console.log(this.props);
		return	<div className="divider a" onClick={this.handleClick}>
					<h2>{this.props.children}{this.props.name}</h2><hr/>
				</div>
	},
	getDefaultProps:function(){
		//alert("getDefaultProps")
	},
	getInitialState:function(){
		//alert("getInitialState")
		return null;
	},
	componentWillMount:function(){
		//alert("componentWillMount")
	},
	componentDidMount:function(){
		//alert("componentDidMount")
	}
});

module.exports = {
    invoke: function(){
    	ReactDOM.render(
  			<Divider name="1">Question</Divider>,
  			document.querySelector('body')
		);
	}
}
