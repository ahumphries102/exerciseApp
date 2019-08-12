const router = require('express').Router()
const Exercise = require('../models/exercise.model')

router.route('/').get((request,response)=>{
	Exercise.find()
	.then(exercise => response.json(exercise))
	.catch(err => response.status(400).json('Error' + err))
})

router.route('/:id').get((request,response)=>{
	Exercise.findById(request.params.id)
	.then(exercise => response.json(exercise))
	.catch(err => response.status(400).json('Error' + err))
})

router.route('/add').post((request, response)=>{
	
	const username = request.body.username
	const description = request.body.description
	const duration = Number(request.body.duration)
	const date = Date.parse(request.body.date)

	const newExcercise = new Exercise({
		username,
		description,
		duration,
		date
	})

	newExcercise.save()
	.then(()=> response.json('Exercise Added!'))
	.catch(err => response.status(400).json('Error' + err))
})

router.route('/update/:id').post((request, response)=>{
	
	Exercise.findById(request.params.id)
	.then(exercise => {
		exercise.username = request.body.username
		exercise.description = request.body.description
		exercise.duration = Number(request.body.duration)
		exercise.date = Date.parse(request.body.date)

		exercise.save()
		.then(()=> response.json('Exercise Updated!'))
		.catch(err => response.status(400).json('Error' + err))
	})
	.catch(err => response.status(400).json('Error' + err))
})

router.route('/:id').delete((request,response)=>{
	Exercise.findByIdAndDelete(request.params.id)
	.then(() => response.json('excercises deleted'))
	.catch(err => response.status(400).json('Error' + err))
})
module.exports = router