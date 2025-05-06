const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Failed", err));

// Define Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: Date
});

// Model
const Employee = mongoose.model('Employee', employeeSchema);

// ➕ Add New Employee
app.post('/employees', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.send('✅ Employee added');
});

// 📋 View All Employees
app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// ✏️ Update Employee
app.put('/employees/:id', async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 🗑️ Delete Employee
app.delete('/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send('🗑️ Employee deleted');
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
