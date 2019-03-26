import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/login';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fullname: '',
			username: '',
			password: '',
			loading: false
		};

		this.baseState = this.state;

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	resetForm() {
		this.setState(this.baseState);
	}

	onHandleChange({ name, value }) {
		this.setState({ [name]: value });
	}

	async onHandleSubmit(e) {
		e.preventDefault();

		const { fullname, username, password } = this.state;

		this.setState({ loading: true });

		const { type, message } = await this.props.signup({name: fullname, email: username, password});
		console.warn(type, message);

		this.setState({ loading: false });

		this.resetForm();
	}

	render() {
		const { username, password, fullname, loading } = this.state;

		return (
			<div id="login">
				<div id="box">
					<form onSubmit={(e) => this.onHandleSubmit(e)}>
						<input
							type="text"
							className="full"
							name="fullname"
							onChange={(e) => this.onHandleChange(e.target)}
							value={fullname}
							placeholder="name"
							autoComplete="off"
							required
							minLength="3" />

						<input
							type="text"
							className="full"
							name="username"
							onChange={(e) => this.onHandleChange(e.target)}
							value={username}
							placeholder="email"
							autoComplete="off"
							required
							minLength="3" />

						<input
							type="password"
							className="full"
							name="password"
							onChange={(e) => this.onHandleChange(e.target)}
							value={password}
							autoComplete="new-password"
							placeholder="password"
							required
							minLength="6" />

						<div id="login-actions">
							<button className="blue-theme" disabled={loading}>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

SignUp.propTypes = {
	signup: PropTypes.func
};

export default connect(null, { signup })(SignUp);
