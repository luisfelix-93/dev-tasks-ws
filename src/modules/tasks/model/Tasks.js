const mongoose  = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskCode: {type: String},
    taskType: {type: String, enum:['dev', 'arch', 'database', 'test']},
    dateStart: {type: Date},
    dateEnd: {type: Date, default: null},
    status: {type: String, enum: ['backlog', 'doing', 'review', 'onDeployment', 'done']},
    note: {type: String},
    userId: { type: String}
})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;