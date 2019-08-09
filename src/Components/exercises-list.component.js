import React, {useState, useEffect} from 'react';
import Exercise from './Exercise'

export default function ExercisesList () {
	let [exerciseState, setExerciseState] = useState({
		username:'',
		description:'',
		duration:0,
		date: new Date()
	})


	let setData = async (id) => {
		try{
			let getExercises = await fetch('http://localhost:5000/exercises')
			let useExercises = await getExercises.json()
			setExerciseState({...exerciseState, username:[...useExercises.map((ele)=>
				<div className='gridNames' key={ele._id}>{ele.username}</div>
			)],
			description:[...useExercises.map((ele)=>
				<div className='gridDesc' key={ele._id}>{ele.description}</div>
			)],
			duration:[...useExercises.map((ele)=>
				<div className='gridDur' key={ele._id}>{ele.duration}</div>
			)]
		})
		}
		catch(error){
			console.log('woops deleteExercise', error)
		}
	}

	const deleteExercise = (id) =>{
		try{
			let getExercisesD = fetch ('http://localhost:5000/exercises'+id, {
				method:'DELETE',
				mode:'cors'
			})
			let useExercisesD = getExercisesD.json()
		}
		catch(error){
			console.log(error)
		}
	}

	useEffect(()=>{
		setData()
	}, [])


  return(
  	<div>
  		<div className = 'gridParent'>
  			{exerciseState.username}
  			{exerciseState.description}
  			{exerciseState.duration}
  		</div>
  	</div>
    )
}