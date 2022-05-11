const { initiateChat } = require("../controllers/chat.controller");

const router = require("express").Router();

router.post('/', initiateChat)
module.exports = router