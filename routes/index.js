const express = require('express');
const router = express.Router();

const task = require('../controllers/task');

router.get('/', (Request, Response) => Response.send('index'));
router.post('/task', task.createAndRun);
router.get('/task/:id', task.runOne);
module.exports = router;