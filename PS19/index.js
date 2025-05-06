const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/student", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"));

const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number,
});

const Student = mongoose.model("studentmarks", studentSchema);

// a + b + c — Insert Sample Students
app.get("/init", async (req, res) => {
  await Student.deleteMany({});
  const students = [
    { Name: "Amit", Roll_No: 1, WAD_Marks: 30, CC_Marks: 28, DSBDA_Marks: 32, CNS_Marks: 25, AI_Marks: 35 },
    { Name: "Bhavna", Roll_No: 2, WAD_Marks: 22, CC_Marks: 24, DSBDA_Marks: 18, CNS_Marks: 19, AI_Marks: 27 },
    { Name: "Chirag", Roll_No: 3, WAD_Marks: 35, CC_Marks: 30, DSBDA_Marks: 38, CNS_Marks: 40, AI_Marks: 39 },
    { Name: "Divya", Roll_No: 4, WAD_Marks: 20, CC_Marks: 21, DSBDA_Marks: 26, CNS_Marks: 23, AI_Marks: 25 },
    { Name: "Esha", Roll_No: 5, WAD_Marks: 26, CC_Marks: 22, DSBDA_Marks: 20, CNS_Marks: 22, AI_Marks: 30 },
  ];
  await Student.insertMany(students);
  res.send("✅ Sample students inserted.");
});

// d — Count and List All
app.get("/students", async (req, res) => {
  const count = await Student.countDocuments();
  const students = await Student.find();
  let html = `<h3>Total Students: ${count}</h3><table border='1'><tr><th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>DSBDA</th><th>CNS</th><th>AI</th></tr>`;
  students.forEach(s => {
    html += `<tr><td>${s.Name}</td><td>${s.Roll_No}</td><td>${s.WAD_Marks}</td><td>${s.CC_Marks}</td><td>${s.DSBDA_Marks}</td><td>${s.CNS_Marks}</td><td>${s.AI_Marks}</td></tr>`;
  });
  html += "</table>";
  res.send(html);
});

// e — Students with DSBDA > 20
app.get("/dsbda/morethan20", async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { Name: 1, _id: 0 });
  res.send(students);
});

// f — Update Marks of Specified Student
app.put("/update/:name", async (req, res) => {
  const name = req.params.name;
  await Student.updateOne({ Name: name }, {
    $inc: {
      WAD_Marks: 10,
      CC_Marks: 10,
      DSBDA_Marks: 10,
      CNS_Marks: 10,
      AI_Marks: 10,
    }
  });
  res.send(`✅ Marks updated for ${name}`);
});

// g — All subjects > 25
app.get("/allsubjects/morethan25", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 },
  }, { Name: 1, _id: 0 });
  res.send(students);
});

// h — Both Maths and Science < 40 (assuming WAD = Math, CNS = Science)
app.get("/lowmarks", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 },
  }, { Name: 1, _id: 0 });
  res.send(students);
});

// i — Remove student
app.delete("/remove/:name", async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.send(`🗑️ Deleted student ${req.params.name}`);
});

// j — Already covered in /students with table format

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
