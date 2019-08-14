import React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CreateUser () {
	let [userNameState, setUserNameState] = useState('')


	let onChangeUserName = e => {
		setUserNameState({username:e.target.value})
	}

	let onSubmit = e => {
		e.preventDefault()

		const user = {
			username:userNameState.username
		}

		console.log(user)

		let postData = fetch('http://localhost:5000/users/add',{
			method:"POST",
			mode:"cors",
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			},
			body: JSON.stringify(user)
		})
		.then(res => console.log(res.data))

		setUserNameState({username:''})

		e.target.reset()
	}
  return(
  	<div className='form'>
  		<h3>Create New Exercise Log</h3>
  		<form onSubmit={onSubmit}>
  			<div className='formGroup'>
  			<label>Username: </label>
	  			<input type='text'
	  			required
	  			value={userNameState.name}
	  			onChange={onChangeUserName}
	  			/>
  			</div>

  			<button type='submit'>Create User</button>
		</form>
  	</div>
    )
}