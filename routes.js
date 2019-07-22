const express = require('express')
const router = express.Router()

router.get('/', (request,response)=>{
	response.send({ express: 'Hello From Express' });
})
router.post('/', (req, res) => {
});
module.exports = router