import React from 'react';

export const Demo3 = React.createClass({
	getInitialState: function(){
		return {
			currentView: 'All'
		}
	},
	
	_updateView: function(theView){
		this.setState({
			currentView: theView
		})
	},
	
	render: function(){
		return (
			<div className="view_demo3">
				<h1>Select a Nationality</h1>
				<NavBar 
					selectedItems={this.state.selectedItems}
					updateViewStateCb={this._updateView}
					theCurrentView={this.state.currentView}
				/>

				<ListContainer 
					userList={this.props.userList}
					_updateTopLevelCb={this._updateTopLevel}
					theCurrentView={this.state.currentView}

				/>
				<hr/>
			</div>
		)
	}
})

const ListContainer = React.createClass({
	_createListItems: function(usersArray, theView){
		
		let component = this
		let jsxComponents = usersArray
			.filter(function(userObj){
				if(theView === 'All') return true
				return userObj.nat === theView
			})
			.map(function(userObj, i){
				return <UserItem key={i} 
							userData={userObj} 
				/>
			})
		return jsxComponents
	},
	
	render: function(){
		console.log('in ListContainer', this.props._updateTopLevelCb)
		return (
			<div className="row">
				{ this._createListItems(this.props.userList, this.props.theCurrentView) }
			</div>
		)
	}
})

const UserItem = React.createClass({

	render: function(){
		let u = this.props.userData
		return (
			<div className="col-sm-4">
				<div className="user-card">
	               <img className="profile-img" src={u.picture.large}/>
	               <h4>{u.name.first} {u.name.last}</h4>
	               <p className="text-muted">{u.email}| <mark>{u.nat}</mark> </p>
	         </div>
			</div>
		)
	}
})

const NavBar = React.createClass({

	render: function(){	
		let component = this
		return (
			<nav>
				{ 
				  ['All', 'US', 'CA', 'GB', 'DE'].map(function(nat, i){ 
						console.log(component.props.updateViewStateCb)
						return <NavOption 
									key={i} 
									viewName={nat} 
									theCurrentView={component.props.theCurrentView}
									updateViewStateCb={component.props.updateViewStateCb}
								/> 
					}) 
				}
			</nav>
		)
	}
})

const NavOption = React.createClass({
	_handleMenuClick: function(){
		this.props.updateViewStateCb(this.props.viewName)
	},

	render: function(){
		let elementClassName = 'btn'
		if(this.props.viewName === this.props.theCurrentView ){
			elementClassName = 'btn current-active'
		}
		return <button className={elementClassName} onClick={this._handleMenuClick}>
			{this.props.viewName}
		</button>
	}
})