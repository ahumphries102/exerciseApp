import React from 'react'


export default function Exercise(props){
	return (
		<div>
			<div>
				<div>{props.exercise.username}</div>
				<div>{props.exercise.description}</div>
				<div>{props.exercise.duration}</div>
				<div>{props.exercise.date.substring(0,10)}</div>
				<div>
					<a href='#' onClick={() => props.deleteExercise(props.deleteExercise(props.exercise.__id))}>delete</a>
				</div>
		</div>
		</div>
	)
}