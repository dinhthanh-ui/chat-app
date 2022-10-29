const express = require('express');
const { addMessage, getMessage } = require('../controllers/messageController');
const router = express.Router();

router.post("/addMessage", addMessage);
router.post("/getMessage", getMessage);

module.exports = router