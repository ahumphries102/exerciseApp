import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CreateExercises () {
	let [userState, setUserState] = useState({
		username:'',
		description:'',
		duration:0,
		date: new Date(),
		users:[]
	})

	const getData = async ()=> {
		try{
			let fetchData = await fetch('http://localhost:5000/users')
			let useData = await fetchData.json() 
			if(useData.length > 0){
				//First we make sure our state is still an object, we then spread out the current object within it.
				//Secondly we target the users and set that keys value to an array and within it we spread out the current array.
				//Lastly we spread out the array within the database so that each value appears as
				//a separate string. It should look something like 'name', 'name', 'name' and not ['name', 'name', 'name']
				setUserState({...userState, users:[...userState, ...useData.map((ele, index) => 
						ele.username
					)
				]})
			}
		}
		catch(error){
			console.log('create-exercise line 32', error)
		}
	}
	useEffect(() => {
		getData()
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

	let onChangeDate = date => {
		setUserState({...userState, date:date})
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

		try{
		let postData = fetch('http://localhost:5000/exercises/add',{
			method:"POST",
			mode:"cors",
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			},
			body: JSON.stringify(exercise)
		})
		let useData = console.log(postData.data)
		}
		catch(error){
			console.error(error, 'caught an error in exercise submit')
		}
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