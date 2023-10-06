const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');
const interviewDetailController = require('../controllers/interview_detail_Controller')
const { route } = require('./interview');
const students = require('../models/student');



const fs = require('fs');
const moment = require('moment');
const mdq = require('mongo-date-query');
const json2csv = require('json2csv').parse;
const path = require('path');
const Student = require('../models/student');
const { interview_detail } = require('../controllers/interview_detail_Controller');
const fields = ['._id', 'name', 'batch', 'college', 'dsa'];

console.log('router loaded');
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/interview', require('./interview'));
router.get('/interview_detail/:id', interviewDetailController.interview_detail);




module.exports = router;

