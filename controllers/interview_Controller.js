const Interview = require('../models/interview');
const path = require('path');
const Student = require('../models/student');
const User = require('../models/user');
const ans = 1;

module.exports.interview = async function (req, res) {
    try {
        let students = await Student.find({})
        let interviews = await Interview.find({})
        return res.send({ students: students, interviews: interviews, success: true });
    } catch (error) {
        console.error(error);
        return res.send({ success: false });
    }
}


module.exports.create = async (req, res) => {
    console.log("interview  --req", req.body)
    const createdInterview = new Interview({
        company_name: req.body.company_name,
        date: req.body.date,
    });
    try {
        const interview = await createdInterview.save();
        res.send({ interview: interview, success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: err });
    }

    return res.status(201).json({
        company_name: req.body.company_name,
        date: req.body.date,
    });
}


module.exports.addStudent = async function (req, res) {
    console.log("inside Add Student Controller")
    console.log("Student id is==", req.body.studentList);
    console.log("company id is==", req.query.compname);

    let interview = await Interview.findById(req.query.compname);
    let student = await Student.findById(req.body.studentList);
    console.log(interview._id);

    console.log(interview.students.length);
    console.log(interview.students.indexOf(student._id));

    if (interview.students.includes(student._id)) {
        console.log("Student Alrady Exists in interview");

        return res.redirect('back');
    } else {
        interview.students.push(student);
        interview.save();
    }

    let studentUpdate = await Student.findById(req.body.studentList);
    let company_name = interview.company_name;
    console.log("student is added to company", company_name);
    studentUpdate.companies.push(company_name);
    studentUpdate.interviews.push(req.query.compname);

    studentUpdate.save();

    res.redirect('back');
}



