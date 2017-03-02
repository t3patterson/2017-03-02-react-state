import $ from 'jquery';
import Backbone from 'backbone';
import React from 'react'
import ReactDOM from 'react-dom'
import {Demo1} from './_01-count-selected.js'
import {Demo2} from './_02-messenger.js'
import {Demo3} from './_03-nav.js'

const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start();
	},

	routes: {
		"demo/3" : "showDemo3",
		"demo/2" : "showDemo2",
		"demo/1" : "showDemo1",
		"" : "showHome"
	},

	showDemo3: function(){
		$.getJSON('https://randomuser.me/api?results=100').then((serverRes)=>{
			ReactDOM.render(<Demo3 userList={serverRes.results}/>, document.querySelector('#app-container'))
		})
	},
		
	showDemo2: function(){
		ReactDOM.render(<Demo2/>, document.querySelector("#app-container"))
	},
	
	showDemo1: function(){
		let fruitList = [
			{name: 'Grapes', color: 'green'},
			{name: 'Apples', color: 'red'},
			{name: 'Strawberry', color: 'red'},
			{name: 'Banana', color: 'yellow'},
			{name: 'Papaya', color: 'orange'},
		]

		ReactDOM.render(<Demo1 foodList={fruitList}/>, document.querySelector("#app-container"))
	},

	showHome: function(){
		ReactDOM.render(
			<div className="view_home">
				<h1>Demos</h1>
				<a className='btn btn-warning' href="#demo/1">Shared Component State</a>
				<br/>
				<a className='btn btn-warning' href="#demo/2">Messenger</a>
				<br/>
				<a className='btn btn-warning' href="#demo/3">Navbar</a>
			</div>, 
			document.querySelector('#app-container'))
	}
})

let app = new AppRouter()