const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String},
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    assignedTo: { type: String },
    dueDate: { type: Date },
});

module.exports = mongoose.model('Task', taskSchema);
