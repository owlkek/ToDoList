let db = require('../utils/sqlitedb');

exports.info = (r,q) => {
   q.render('api');
};

exports.auth = (r, q, next) =>{
    db.getRole(r.query).then(role => {
        r.isAdmin = role === 'Admin';
        r.isUser = role === 'Admin' || role === 'User';
        if(r.isUser){
            next();
        }
        else {
            q.status(401).json('Login or password is incorrect');
        }
    });
};

exports.get = (r,q) => {
    if(r.isUser){
    db.getTasks(+r.query.id).then(item => {
        q.json(item || {});
    });
}
};

exports.add = (r, q) => {
    if(r.isAdmin){
    db.getStatuses(+r.body.status).then(status => {
        r.body.status = status;
        db.addTask(r.body).then(x => {
            db.getLastTask().then(task => {
                q.json(task);
            });    
        });
    });
}
else {
    q.status(403).json('User has no rights');
}
};

exports.remove = (r, q) => {
    if(r.isAdmin){
        db.getTasks(+r.query.id).then(task =>{
            db.removeTask(task.id).then(x=>{
                q.json(task);
            });
        });
    }
else {
    q.status(403).json('User has no rights')
};
}
exports.update = (r, q) => {
    db.getStatuses(+r.body.status).then(status => {
    console.log(status);
    r.body.status = status;
    if(r.isAdmin === true) {
    db.updateTask(r.body);
    q.json(`Запись обновлена`);
    } else {
    q.status(403).json('Вы не можете обновлять записи');
    }
    });
};