const Student = require('../models/student');
const Interview = require('../models/interview');

module.exports.create = async (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        batch: req.body.batch,
        college: req.body.college,
        dsa: req.body.dsa,
        webd: req.body.webd,
        react: req.body.react,
    });
    try {
        const student = await newStudent.save();
        res.send({ student: student, success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: err });
    }
}


module.exports.placed = async function (req, res) {
    console.log("inside placed");
    console.log("Studnet who is placed is", req.body.studentId);

    try {
        let interview = await Interview.findOne({ _id: req.body.interviewId });
        let student = await Student.findOne({ _id: req.body.studentId });

        student.placed = true;
        student.student_placed = interview.company_name;
        student.save();
        res.send({ student: student, success: true });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: err });
    }
}

















