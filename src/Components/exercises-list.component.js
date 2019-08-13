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
  	<div>
  		{exerciseState.map(ele => (
		        <div key={ele._id} className='gridParent'>
		          <p>{ele.username}</p><br/>
		          <p>{ele.description}</p>
		          <p>{ele.duration}</p><br/>
		          <p>{ele.date}</p>
		          
		            <a href='#' onClick={()=>deleteExercise(ele._id)}>delete</a>
		          
		        </div>
      		))}
  		<button onClick={()=>console.log(exerciseState)}>delete</button>
  	</div>
    )
}