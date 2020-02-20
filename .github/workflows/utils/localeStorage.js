const { Task, Status } = require('../models');

let statuses = [
    new Status('New'),
    new Status('In work'),
    new Status('Complete'),
];

let tasks = [
    new Task('Title 1', null, null, statuses[0]),
    new Task('Title 2', null, null, statuses[1]),
    new Task('Title 3', null, null, statuses[2]),   
];

let db={
    getStatuses: id => {
        if(!id) return statuses;
        let item = statuses.filter(x => x.id === id)[0];
        return item || null;
    },

    getTasks: id => {
        if (!id) return tasks;
        let item = tasks.filter(x => x.id === id)[0];
        return item || null;
    },

    addTask: x=>{
        x.id = Task.count++;
        tasks.push(x);
    },

    updateTask: x => {
        let item = tasks.filter(y => y.id === x.id)[0];
        if(item) {
            item.title = x.title;
            item.startDate = x.startDate;
            item.endDate = x.endDate;
            item.status = x.status;
        }
    },

    removeTask: id => {
        let item = tasks.filter(x => x.id === id)[0];
        if (item){
            index = tasks.indexOf(item);
            tasks.splice(index,1);
        }
    }
}

module.exports = db;