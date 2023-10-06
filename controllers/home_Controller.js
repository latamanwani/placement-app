
const Interview = require('../models/interview');
const Student = require('../models/student');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
        const students = await Student.find({});
        return res.send({ students: students, success: true });
    } catch (error) {
        console.error(error);
        return res.send({ success: false });
    }
}







