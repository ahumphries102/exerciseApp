import React from 'react'
import { useRoutes, A } from 'hookrouter'
import ExercisesList from './exercises-list.component'
import EditExercises from './edit-exercise.component'
import CreateUser from './create-user.component'
import CreateExercise from './create-exercise.component'

const routes = {
	'/exerciseApp/': () => <ExercisesList />,
	'/edit/:id': () => <EditExercises/>,
	'/user' : () => <CreateUser />,
	'/create':() => <CreateExercise />
};

export default function router () {
	const routeResult = useRoutes(routes)
  return (
    <div>
	  	<nav className='gridParentNav'>
	  		<A href='/'><span>EXCITEcercise</span></A>
		    <A href='/'>ExerTrack</A>
		    <A href='/edit'>Edit Exercises</A>
		    <A href='/create'>Create Exercise Log</A>
		    <A href='/user'>Create User</A>
	    </nav>
	    {routeResult}
	</div>
  	)
}