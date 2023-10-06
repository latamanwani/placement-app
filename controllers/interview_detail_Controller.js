const Interview = require('../models/interview');
const path = require('path');
const Student = require('../models/student');

module.exports.interview_detail = async function (req, res) {
    const { id } = req.params;
    console.log(id)
    try {
        let interview = await Interview.findOne({ _id: id });
        let students = await Student.find({});
        let companytitle = interview.company_name;
        let company = await Interview.findOne({ _id: id }).populate('students').populate({
            path: 'students'
        }).populate('students')
        return res.send({
            company_name: interview.company_name,
            company_id: interview._id,
            student_detail: students,
            interview_student: company.students,
            title: companytitle
        });
    } catch (error) {
        console.error(error);
        return res.send({ success: false });
    }
}


module.exports.placed = async function (req, res) {
    console.log('inside placed');
    return res.render('interview-detail', {
        company_name: interview.company_name,
        company_id: interview._id,
        student_detail: students,
        interview_student: company.students
    })
}







