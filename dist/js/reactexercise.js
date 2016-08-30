(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var a = require('../jsx/react/exercise1.js');
a.invoke();

},{"../jsx/react/exercise1.js":2}],2:[function(require,module,exports){
var Divider = React.createClass({displayName: "Divider",
	handleClick:function(event){
		//console.log(event)
	},
	render:function(){
		console.log(this.props);
		return	React.createElement("div", {className: "divider a", onClick: this.handleClick}, 
					React.createElement("h2", null, this.props.children, this.props.name), React.createElement("hr", null)
				)
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
  			React.createElement(Divider, {name: "1"}, "Question"),
  			document.querySelector('body')
		);
	}
}
},{}]},{},[1]);
