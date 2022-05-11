const router = require('express').Router();
const {createBusList, myBusList, getAllBusiness} = require('../controllers/busList.controller')
router.post('/create/:posterId', createBusList)
router.get('/mybuslist/:id', myBusList)
router.get('/getall', getAllBusiness)
// router.update('')
module.exports = router