const mongoose  = require('mongoose');

const taskSchema = new mongoose.Schema({
    idUser: {type: String, required: true},
    taskCode: {type: String, required: true},
    taskType: {type: String, enum:['dev', 'arch', 'database']},
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, default: null},
    status: {type: String, enum: ['backlog', 'doing', 'review', 'onDeployment', 'done']},
    note: {type: String}
})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;