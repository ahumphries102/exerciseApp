import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function EditExercise (props) {
	let [exerciseState, setExerciseState] = useState({
		username:'',
		description:'',
		duration:0,
		date: new Date(),
		users:[]
	})

	const update = async ()=>{
		try{ 
			let getExercises = fetch('http://localhost5000/exercises')
			let useExercises = getExercises.json()
			setExerciseState({...exerciseState,
				username:useExercises.username,
				description:useExercises.description,
				duration:useExercises.duration,
				date: new Date(useExercises.date),
			})

			let getUsers = fetch('http://localhost5000/users')
			let userData = getUsers.json()

			if(userData.length > 0){
				setExerciseState({...exerciseState, username:userData.map(ele => ele.username)})
			}
		}
		catch(error){
			console.log('update function error', error)
		}
	}

	const getData = async (id)=> {
		try{
			await fetch('http://localhost:5000/exercises'+props.match.params.id)
			.then( res => res.json())
			.then( data =>{ 
					if(data.length > 0){
						//First we make sure our state is still an object, we then spread out the current object within it.
						//Secondly we target the users and set that keys value to an array and within it we spread out the current array.
						//Lastly we spread out the array within the database so that each value appears as
						//a separate string. It should look something like 'name', 'name', 'name' and not ['name', 'name', 'name']
						setExerciseState({...exerciseState, users:[...exerciseState, ...data.map((ele, index) => 
								ele.username
							)
						]})
					}
				})
		}
		catch(error){
			console.log('edit error', error)
		}
	}

	let onChangeUserName = e => {
		setExerciseState({...exerciseState, username:e.target.value})
	}

	let onChangeDescription = e => {
		setExerciseState({...exerciseState, description:e.target.value})
	}

	let onChangeDuration = e => {
		setExerciseState({...exerciseState, duration:e.target.value})
	}

	let onChangeDate = date => {
		setExerciseState({...exerciseState, date:date})
	}

	let onSubmit = e => {
		e.preventDefault()
		const exercise = {
			username:exerciseState.username,
			description:exerciseState.description,
			duration:exerciseState.duration,
			date: exerciseState.date
		}

		try{
		const postData = fetch('http://localhost:5000/exercises/update/'+props.match.params.id,{
			method:"POST",
			mode:"cors",
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			},
			body: JSON.stringify(exercise)
		})
		.then(resp => console.log(resp.data))
		}
		catch(error){
			console.error('caught an error in exercise submit', error)
		}
		//window.location = '/'
	}

	useEffect(() => {
		getData()
		update()
	}, [])
  return(
  	<div>
  		<h3>Edit Exercise Log</h3>
  		<form onSubmit={onSubmit}>
  			<div className='form-group'>
  			<label>Username: </label>
	  			<select useref='userInput'
			  		required
			  		value={exerciseState.username}
			  		onChange={onChangeUserName}>
			  		{
			  			exerciseState.users.map( (user, index) => {
			  				return <option key={index} value={user}>{user}</option>
			  			})
			  		}
	  			</select>
  			</div>

  			<div className='form-group'>
  			<label>Description: </label>
  				<input type='text'
  					required
  					value={exerciseState.description}
  					onChange={onChangeDescription}
  				/>
  			</div>

  			<div className='form-group'>
  			<label>Duration (in minutes): </label>
  				<input type='text'
  					required
  					value={exerciseState.duration}
  					onChange={onChangeDuration}
  				/>
  			</div>

  			<div className='form-group'>
  			<label>Date: </label>
  				<div>
  				<DatePicker 
  					selected={exerciseState.date}
  					onChange={onChangeDate}
  				/>
  				</div>
  			</div>
  			<input type='submit' value='Edit Exercise Log'/>
		</form>
  	</div>
    )
}