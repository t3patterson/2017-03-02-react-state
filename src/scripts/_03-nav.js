import React from 'react';

export const Demo3 = React.createClass({
	getInitialState: function(){
		return {
			selectedItems: []
		}
	},
	
	_updateTopLevel: function(){
	},
	
	render: function(){
		return (
			<div className="view_demo3">
				<h1>Select a Nationality</h1>

				<ListContainer 
					userList={this.props.userList}
					_updateTopLevelCb={this._updateTopLevel}
				/>
				<hr/>
				<SelectedCount selectedItems={this.state.selectedItems}/>
			</div>
		)
	}
})

const ListContainer = React.createClass({
	_createListItems: function(foodArray){
		
		let component = this
		let jsxComponents = foodArray.map(function(foodObj, i){
			return <UserItem key={i} 
						userData={foodObj} 
						_updateTopLevelCb={component.props._updateTopLevelCb} 
			/>
		})
		return jsxComponents
	},
	
	render: function(){
		console.log('in ListContainer', this.props._updateTopLevelCb)
		return (
			<div className="row">
				{ this._createListItems(this.props.userList) }
			</div>
		)
	}
})

const UserItem = React.createClass({

	render: function(){
		return (
			<div className="col-sm-4">
				<div className="user-card">
	               <img className="profile-img" src="https://randomuser.me/api/portraits/women/41.jpg"/>
	               <h4>cacilda almeida</h4>
	               <p className="text-muted">cacilda.almeida@example.com | <mark>BR</mark> </p>
	         </div>
			</div>
		)
	}
})

const SelectedCount = React.createClass({
	render: function(){
		let selectedItemsCount = this.props.selectedItems.length
		console.log(selectedItemsCount)
		return (
			<nav>
				<button className="btn">All</button>
				<button className="btn">US</button>
				<button className="btn">GB</button>
				<button className="btn">DE</button>
			</nav>
		)
	}
})