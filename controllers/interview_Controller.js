const Interview = require('../models/interview');
const Student = require('../models/student');

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
}


module.exports.addStudent = async function (req, res) {
    console.log("inside Add Student Controller")
    console.log("Student id is==", req.body.studentId);
    console.log("company id is==", req.body.interviewId);

    const { id } = req.params;
    console.log(id)
    try {
        let interview = await Interview.findOne({ _id: req.body.interviewId });
        let student = await Student.findOne({ _id: req.body.studentId });
        console.log(interview._id);

        console.log(interview.students.length);
        console.log(interview.students.indexOf(student._id));

        if (interview.students.includes(student._id)) {
            console.log("Student Alrady Exists in interview");
            return res.send({
                success: false,
                message: "Student Alrady Exists in interview"
            });
        } else {
            interview.students.push(student);
            interview.save();
        }

        let studentUpdate = await Student.findOne({ _id: req.body.studentId });
        let company_name = interview.company_name;
        console.log("student is added to company", company_name);
        studentUpdate.companies.push(company_name);
        studentUpdate.interviews.push(req.body.interviewId);

        studentUpdate.save();
        return res.send({
            company_name: interview.company_name,
            company_id: interview._id,
            student_detail: studentUpdate,
            interview: interview,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.send({ success: false });
    }
}



