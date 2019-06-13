import {ADDUSER, ADDEVENTS, LOGOUT, ADDEVENT, EDITEVENT, SETERROR, CLEARERROR} from './types'

////////////////////////////////
// BEGIN USER FUNCTIONALITY
////////////////////////////////

export function signup (credentials) {
	return function (dispatch) {
		return fetch('http://localhost:3000/api/v1/users', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({user: credentials})
    		}).then(res => res.json())
				.then(resp => {
					createError(resp.message)
					setJWT(resp.jwt)
					dispatch({ type: ADDUSER, payload: resp.user })
				}).catch(throwError(dispatch))
	}

}

export function login (credentials) {
	return function (dispatch){
		return fetch('http://localhost:3000/api/v1/login',{
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({user: credentials})
			})
				.then(res => res.json())
				.then(resp => {
					createError(resp.message)
					setJWT(resp.jwt)
					dispatch({ type: ADDUSER, payload: resp.user })
				}).catch(throwError(dispatch))
	}
}

export function autoLogin () {
	return function (dispatch) {
		return fetch(`http://localhost:3000/api/v1/auto_login`, {
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${localStorage.JWT}`
			}
		}).then(res=> res.json())
			.then(resp=>{
				dispatch({ type: ADDUSER, payload: resp.user })
			})
	}
}

export function logOut () {
	return function (dispatch) {
		removeJWT()
		dispatch({type: LOGOUT})
	}
}

 

export function editUser (userID, userObj) {
	console.log("hit edit user", localStorage.JWT)
	return function (dispatch) {
		return fetch(`http://localhost:3000/api/v1/users/${userID}`,{
			method: 'PATCH',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${localStorage.JWT}`
			},
			body: JSON.stringify(userObj)
		}).then(res => res.json())
			.then(resp => {
					dispatch({type: ADDUSER, payload: resp.user})
			})
	}
}

////////////////////////////////
// END USER FUNCTIONALITY
////////////////////////////////


////////////////////////////////
// BEGIN EVENT FUNCTIONALITY
////////////////////////////////


export function eventCreate (eventObj) {
	debugger
	return function (dispatch) {
		return fetch('http://localhost:3000/api/v1/events/', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${localStorage.JWT}`
			},
			body: JSON.stringify(eventObj)
		}).then(res=>res.json())
			.then(resp => {
				createError(resp.message)
				dispatch({type: ADDEVENT, payload: resp.event})
				return resp.event.id
			}).catch(throwError(dispatch))
	}
}

export function addEvents () {
	return function (dispatch){
		return fetch('http://localhost:3000/api/v1/events')
			.then(res => res.json())
			.then(resp =>{
				// debugger
				dispatch({ type: ADDEVENTS, payload: resp })
			})
	}
}

export function editEvent (eventID, editObj) {
	return function (dispatch) {
		return fetch(`http://localhost:3000/api/v1/events/${eventID}`, {
			method: 'PATCH',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${localStorage.JWT}`
			},
			body: JSON.stringify(editObj)
		}).then(res=>res.json())
			.then(resp => {
				createError(resp.message)
				dispatch({type: EDITEVENT, payload: resp.event})
			}).catch(throwError(dispatch))
	}
}

////////////////////////////////
// END EVENT FUNCTIONALITY
////////////////////////////////


////////////////////////////////
// MISC FUNCTIONALITY
////////////////////////////////

export function clearErrors () {
	return function (dispatch) {
		dispatch({type: CLEARERROR})
	}
}




////////////////////////////////////////////////////////////////////////////////////
// Single Responsibility Functions
////////////////////////////////////////////////////////////////////////////////////

function setJWT (token) {
	localStorage.setItem("JWT", token)
}

function removeJWT () {
	localStorage.removeItem("JWT")
}

function createError (msg) {
	if (msg) throw Error(msg)
}

function throwError (dispatch) {
	return function (error) {
		dispatch({type: SETERROR, payload: error.message})
	}
}

////////////////////////////////////////////////////////////////////////////////////
