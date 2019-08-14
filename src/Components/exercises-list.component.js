import React, {useState, useEffect} from 'react';
export default function ExercisesList () {
	let [exerciseState, setExerciseState] = useState([])

	const deleteExercise = (id) =>{
		try{
			let deleteExercisesD = fetch ('http://localhost:5000/exercises/'+id, {
					method:'DELETE',
					mode:'cors'
				})
		}
		catch(error){
			console.log(error)
		}
		return setExerciseState(exerciseState.filter(ele => ele._id != id))
	}

	let setData = async (id) => {
		try{
			let getExercises = await fetch('http://localhost:5000/exercises')
			let useExercises = await getExercises.json()
			

      setExerciseState(useExercises);
    
		}
		catch(error){

			console.log('woops deleteExercise', error)
		}
	}

	useEffect(()=>{
		setData()
	}, [])


  return(
  	<div className='gridParentBody'>
  		<ul className='exerciseTitles'>
  			<li>Username</li>
  			<li>Description</li>
  			<li>Duration</li>
  			<li>Date</li>
  		</ul>
  		{exerciseState.map(ele => (
		        <ul key={ele._id} className='gridChildExercise'>
		          <li>{ele.username}</li>
		          <li>{ele.description}</li>
		          <li>{ele.duration}</li>
		          <li>{ele.date.substring(0,10)}</li>
		          <li><a href='#' onClick={()=>deleteExercise(ele._id)}>Delete</a></li>
		          
		        </ul>
      		))}
  	</div>
    )
}