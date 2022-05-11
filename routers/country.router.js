const { getCountryList, getStatesList, getCitiesList } = require('../controllers/user.controller');

const router = require('express').Router();


router.get('/country', getCountryList)
router.post('/state', getStatesList)
router.post('/city', getCitiesList)

module.exports = router