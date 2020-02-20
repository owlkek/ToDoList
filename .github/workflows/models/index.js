class Status {
    static count = 1;
    constructor(name) {
        this.id = Status.count++;
        this.name = name;
    }
}
exports.Status = Status;

class Task {
    static count = 1;
    constructor(title, start, end, status) {
        let dateNow = new Date().toISOString().split('T')[0];

        this.title = title || '';
        this.startDate = start || dateNow;
        this.endDate = end || dateNow;
        this.status = status || null;
        this.id = Task.count++;
    }
}
exports.Task = Task;

exports.MainViewModel = class {
    constructor(title, tasks, statuses, editItem) {
        this.title = title || '';
        this.tasks = tasks || [];
        this.statuses = statuses || [];
        this.editItem = editItem || null;
    }
}