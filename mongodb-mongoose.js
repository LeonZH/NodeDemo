/*
 * Created by LeonZH on 2014/9/4 0004.
*/

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tasks');

var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

//add
var Task = mongoose.model('Task');
var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function(err) {
    if (err) throw err;
    console.log('Task saved.');
});

//search
var Task = mongoose.model('Task');
Task.find({'project': 'Bikeshed'}, function(err, tasks) {
    for (var i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});

//update
var Task = mongoose.model('Task');
Task.update(
    {_id: '5407ddd83b7f06e87edab841'},
    {description: 'Update description'},
    {multi: false},
    function(err, rows_updated) {
        if (err) throw err;
        console.log('Update Success');
    }
);

//delete
var Task = mongoose.model('Task');
Task.findById('5407ddd1b578df807e0ca5ac', function(err,task) {
    if(err) throw err;
    if (task == null) {
        console.log('Already removed.');
        return;
    }
    task.remove();
});
