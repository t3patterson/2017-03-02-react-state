import React from 'react';

export const Demo2 = React.createClass({
	getInitialState: function(){
		return {
			theSecrets: []
		}
	},

	_updateTheSecrets: function(newSecret){
		let secretsArrayCopy = this.state.theSecrets.map(function(copy){return copy})
 		secretsArrayCopy.push(newSecret)
		this.setState({
			theSecrets: secretsArrayCopy
		})
	},

	render: function(){
		console.log('this.state.secrets  : ', this.state.theSecrets)
		return (
			<div className="view_demo2">
				<h1>Tell Me Your Secrets</h1>
				<InputComponent updateSecretsCb={this._updateTheSecrets}/>
				<hr/>			
				<SecretsBox secretsList={this.state.theSecrets} />			
			</div>
		)
	}
})

const InputComponent = React.createClass({
	_handleNewSecret: function(){
		let newObjSecret = {
			msg: this.refs.secretInput.value,
			name: this.refs.usernameInput.value
		}

		this.props.updateSecretsCb(newObjSecret)
		this.refs.secretInput.value = ''
		this.refs.usernameInput.value = ''

	},

	render: function(){
		return (
			<div className="secret-box">
				<input ref="secretInput" type='text' className="form-control" placeholder="Your secret"/>
				<input ref="usernameInput" type='text' className="form-control" placeholder="Your name" style={{maxWidth: '200px', margin: '10px', }}/>
				<button className="btn btn-success btn-lg" onClick={this._handleNewSecret}> 
 					<i className="fa fa-plus"/>
				</button>
			</div>
		)
	}
})

const SecretsBox = React.createClass({
	_createJsxBlockQuotes: function(arrayOfSecretsObjects){
		let jsxArray = arrayOfSecretsObjects.map(function(objSecr){
			return (
				<blockquote>
					<p> {objSecr.msg}</p>
					<p className="text-right">
						<cite>{objSecr.name}</cite>
					</p>
				</blockquote>
			)
		})
		return jsxArray
	},

	render: function(){
		return (
			<div className="secrets">
				<h3 className="bg-info" style={{color:'#fff', padding:'10px'}}>Secrets For Real</h3>
				{this._createJsxBlockQuotes(this.props.secretsList)}
			</div>
		)
	}
})