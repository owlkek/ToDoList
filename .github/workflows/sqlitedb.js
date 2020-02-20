const sqlite = require("sqlite3").verbose();
const path = "todo.db";

function connection() {
    return new sqlite.Database(path, err => {
        if(err) console.error("Database connect. ", err.message);
        else console.log("Database is connected");
    });
}

exports.getStatuses = function(id) {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM Status";
        let params = [];
        if(id) {
            query += " WHERE ID = ?";
            params.push(id);
        }

        connection().all(query, params, (err, result) => {
            if(err) reject(err);
            else {
                if(id) {
                    result = result[0];
                }
                resolve(result);
            }
        }).close();
    });
}

exports.getTasks = function(id) {
    return new Promise((resolve, reject) => {
        let context = connection();
        let query = "SELECT * FROM Status";

        context.all(query, (err, statuses) => {
            if(err) {
                reject(err);
            }
            else {
                query = "SELECT * FROM Task";
                let params = [];
                if(id) {
                    query += " WHERE ID = ?";
                    params.push(id);
                }
                context.all(query, params, (err, result) => {
                    if(err) {
                        reject(err);
                    }
                    else {
                        result.forEach(x => {
                            x.status = statuses.filter(y => y.id === x.idStatus)[0];
                            delete x.idStatus;
                        });
                        if(id) {
                            result = result[0];
                        }
                        resolve(result);
                    }
                });
            }
        }).close();
    });
}

exports.addTask = function(task) {
    return new Promise((resolve, reject) => {
        if(!task) {
            reject({message: "task is empty"});
            return;
        }
        let dateNow = new Date().toISOString().split("T")[0];
        let query = "INSERT INTO Task (title, startDate, endDate, idStatus) VALUES(?, ?, ?, ?)";
        let params = [task.title || "", task.startDate || dateNow, task.endDate || dateNow, task.status.id || null];

        connection().run(query, params, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        }).close();
    });
}

exports.updateTask = function(task) {
    return new Promise((resolve, reject) => {
        if(!task.id) {
            reject({message: "task is empty"});
            return;
        }
        let dateNow = new Date().toISOString().split("T")[0];
        let query = "UPDATE Task SET title = ?, startDate = ?, endDate = ?, idStatus = ? WHERE id = ?";
        let params = [task.title || "", task.startDate || dateNow, task.endDate || dateNow, task.status.id || null, task.id];
        console.log(params);
        connection().run(query, params, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        }).close();
    });
}

exports.removeTask = function(id) {
    return new Promise((resolve, reject) => {
        if(!id) {
            reject({message: "id is empty"});
            return;
        }

        let query = "DELETE FROM Task WHERE ID = ?";
        let params = [ id ];
        connection().run(query, params, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        }).close();
    });
}