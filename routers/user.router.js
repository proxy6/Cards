const router = require('express').Router();
const { createUser, checkPhone, login, forgetPass, 
    verifyLogin, forgetPassVerify, updatePassword } = require('../controllers/user.controller');
const auth = require('../utils/auth');

router.post('/chck-phone', checkPhone)
router.post('/sign-up', createUser )
router.post('/login', login)
router.post('/login/verify', verifyLogin)
router.post('/forgotpass', forgetPass)
router.post('/forgotpass/verify', forgetPassVerify)
router.post('/changepass', updatePassword)

module.exports = router

