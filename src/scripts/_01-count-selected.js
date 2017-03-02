import React from 'react';

export const Demo1 = React.createClass({
	getInitialState: function(){
		return {
			selectedItems: []
		}
	},
	
	_updateTopLevel: function(selectedItemObj, isCurrentlySelected){
		console.log('From <Demo1/>', selectedItemObj, isCurrentlySelected)
			
			let copyOfItems = this.state.selectedItems.map(function(copy){return copy})
			
			if(isCurrentlySelected === true){
				copyOfItems.push(selectedItemObj)
				this.setState({
					selectedItems: copyOfItems
				})

			} else {
				let copyOfItemsLessDeselectedItem = copyOfItems.filter(function(itemObj){
					if(selectedItemObj.name !== itemObj.name){
						return true
					} else {
						return false
					}
				})
				this.setState({
					selectedItems: copyOfItemsLessDeselectedItem
				})
			}

		},
	
	render: function(){
		return (
			<div className="view_demo3">
				<h1>Component 2 Component</h1>

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
			return <ListItem key={i} 
						userData={foodObj} 
						_updateTopLevelCb={component.props._updateTopLevelCb} 
			/>
		})
		return jsxComponents
	},
	
	render: function(){
		console.log('in ListContainer', this.props._updateTopLevelCb)
		return (
			<ul>
				{ this._createListItems(this.props.foodList) }
			</ul>
		)
	}
})

const ListItem = React.createClass({
	getInitialState: function(){
		return {
			isSelected: false
		}
	},

	_handleItemClick: function(){
		let endingSelectedState
		
		if(this.state.isSelected === true){
			endingSelectedState = false
		} else {
			endingSelectedState = true
		}

		this.props._updateTopLevelCb( this.props.foodData , endingSelectedState)

		this.setState({
			isSelected: endingSelectedState
		})
	},

	render: function(){
		let elementClassName = ''
		if(this.state.isSelected === true){
			elementClassName = 'selected'
		}
		return (
			<li className={elementClassName} onClick={this._handleItemClick} >
				{this.props.foodData.name} <small>({this.props.foodData.color})</small>
			</li>
		)
	}
})

const SelectedCount = React.createClass({
	render: function(){
		let selectedItemsCount = this.props.selectedItems.length
		console.log(selectedItemsCount)
		return (
			<h2>There are <mark>{selectedItemsCount}</mark> items selected!</h2>
		)
	}
})