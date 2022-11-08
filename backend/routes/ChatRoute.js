const express = require('express')
const {sendUsers,sendMessages,sendDiscussion} = require('../controlers/ChatControler')

const route = express.Router();

route.get('/sendUsers',sendUsers)
route.get('/sendMessages',sendMessages)
route.get('/sendDiscussion',sendDiscussion)

module.exports = route