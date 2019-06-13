import React from 'react'
import Button from '@material-ui/core/Button'


function Landing(props) {

	const login = () => {
		props.history.push("/login")
	}

	const signup = () => {
		props.history.push("/signup")
	}


	return (
		<div>
			<Button variant="outlined" onClick={login}> log in </Button>
			<br/>
			<Button variant="outlined" onClick={signup}> sign up </Button>
		</div>
	)
}

export default Landing