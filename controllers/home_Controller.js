
const Student = require('../models/student');

module.exports.home = async function (req, res) {
    try {
        const students = await Student.find({});
        return res.send({ students: students, success: true });
    } catch (error) {
        console.error(error);
        return res.send({ success: false });
    }
}







