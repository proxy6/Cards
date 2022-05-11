const router = require('express').Router();
const { getAllNotification, getSingleNotification, toggleReadStatus, deleteNotification, } = require('../controllers/notification.controller')
router.get('/all/:id', getAllNotification)
router.post('/single', getSingleNotification)
router.post('/mark', toggleReadStatus)
router.delete('/delete', deleteNotification)
module.exports = router