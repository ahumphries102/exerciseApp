import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CreateExercises () {
	let [userState, setUserState] = useState({
		username:'',
		description:'',
		duration:0,
		date: new Date(),
		users:['']
	})
	useEffect(() => {
		setUserState({...userState, username:'test user', users:['test user']})
	}, [])

	let onChangeUserName = e => {
		setUserState({...userState, username:e.target.value})
	}

	let onChangeDescription = e => {
		setUserState({...userState, description:e.target.value})
	}

	let onChangeDuration = e => {
		setUserState({...userState, duration:e.target.value})
	}

	let onChangeDate = ({e}) => {
		setUserState({...userState, date:e.target.value})
	}

	let onSubmit = e => {
		e.preventDefault()
		const exercise = {
			username:userState.username,
			description:userState.description,
			duration:userState.duration,
			date: userState.date
		}

		console.log(exercise)
		//window.location = '/'
	}
  return(
  	<div>
  		<h3>Create New Exercise Log</h3>
  		<form onSubmit={onSubmit}>
  			<div className='form-group'>
  			<label>Username: </label>
	  			<select useref='userInput'
			  		required
			  		value={userState.username}
			  		onChange={onChangeUserName}>
			  		{
			  			userState.users.map( (user, index) => {
			  				return <option key={index} value={user}>{user}</option>
			  			})
			  		}
	  			</select>
  			</div>

  			<div className='form-group'>
  			<label>Description: </label>
  				<input type='text'
  					required
  					value={userState.description}
  					onChange={onChangeDescription}
  				/>
  			</div>

  			<div className='form-group'>
  			<label>Duration (in minutes): </label>
  				<input type='text'
  					required
  					value={userState.duration}
  					onChange={onChangeDuration}
  				/>
  			</div>

  			<div className='form-group'>
  			<label>Date: </label>
  				<div>
  				<DatePicker 
  					selected={userState.date}
  					onChange={onChangeDate}
  				/>
  				</div>
  			</div>
  			<input type='submit' value='Create Exercise Log'/>
		</form>
  	</div>
    )
}