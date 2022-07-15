const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');
const { request } = require('express');


const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bajaj@123',
    database: 'feedback_system'
});

let user;
let email;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html')
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    user = username;
    let password = req.body.password;

    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM accounts WHERE username ='${username}'`, function(err, result, fields) {
            if (err) throw err;
            if (result[0].username == username && result[0].password == password) {
                res.send(result[0].idtype)
            } else {
                res.status(200).send("Incorrect ID/Password entered")
            }
        });
    });

})

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/views/Dashboard_admin.html')
});

app.post('/admin', (req, res) => {
    con.query(`SELECT * FROM accounts WHERE username ='${user}'`, function(err, result, fields) {
        if (err) throw err;
        if (result[0].username == user) {
            email = result[0].email;
            var data = [result[0].name, result[0].email];
            res.send(data);
        } else {
            res.send("N/A")
            return;
        }
    });
});

app.get('/student', (req, res) => {
    res.sendFile(__dirname + '/public/views/Dashboard_student.html');
});

app.post('/student', (req, res) => {
    con.query(`SELECT * FROM accounts WHERE username ='${user}'`, function(err, result, fields) {
        if (err) throw err;
        if (result[0].username == user) {
            var data = [result[0].name, result[0].email];
            res.send(data);
        } else {
            res.send("N/A")
            return;
        }
    });
});

app.get('/professor', (req, res) => {
    res.sendFile(__dirname + '/public/views/Dashboard_professor.html')
});

app.post('/professor', (req, res) => {
    con.query(`SELECT * FROM accounts WHERE username ='${user}'`, function(err, result, fields) {
        if (err) throw err;
        if (result[0].username == user) {
            var data = [result[0].name, result[0].email];
            res.send(data);
        } else {
            res.send("N/A")
            return;
        }
    });
});

app.get('/upload_student', (req, res) => {
    res.sendFile(__dirname + '/public/views/upload_student.html');
});

app.post('/upload_student', (req, res) => {
    let upload_user = req.body.username;
    let upload_pass = req.body.password;
    let upload_name = req.body.name;
    let upload_email = req.body.email;
    con.query(`INSERT INTO accounts (username,password,email,idtype,name) VALUES('${upload_user}','${upload_pass}','${upload_email}','student','${upload_name}')`,
        (err, field, result) => {
            if (err) throw err;
            else {
                var data = true;
                res.send(data);
            }
        });
});

app.post('/details', (req, res) => {
    con.query(`SELECT * FROM accounts WHERE username ='${user}'`, function(err, result, fields) {
        if (err) throw err;
        if (result[0].username == user) {
            var data = [result[0].name, result[0].email];
            res.send(data);
        } else {
            res.send("N/A")
            return;
        }
    });
})

app.get('/upload_teacher', (req, res) => {
    res.sendFile(__dirname + '/public/views/upload_teacher.html');
});

app.post('/upload_teacher', (req, res) => {
    let upload_user = req.body.username;
    let upload_pass = req.body.password;
    let upload_name = req.body.name;
    let upload_email = req.body.email;
    con.query(`INSERT INTO accounts (username,password,email,idtype,name) VALUES('${upload_user}','${upload_pass}','${upload_email}','professor','${upload_name}')`,
        (err, field, result) => {
            if (err) throw err;
            else {
                var data = true;
                res.send(data);
            }
        });
});


app.get('/feedbacks', (req, res) => {
    con.query("SELECT * FROM feedbacks", function(error, data) {
        if (error)
            throw error;
        else {
            res.render('display_feedback', { sampleData: data, message: 'success' });
        }
    })

});

app.post('/upload_feedback', (req, res) => {
    let section = req.body.section;
    let feedback = req.body.feedback;
    let subject = req.body.subject;
    let semester = req.body.semester;
    con.query(`INSERT INTO feedbacks (section,feedback,semester,subject) VALUES('${section}','${feedback}','${semester}','${subject}')`,
        (err, field, result) => {
            if (err) throw err;
            else {
                var data = true;
                res.send(data);
            }
        });
});

app.get('/upload_feedback', (req, res) => {
    res.sendFile(__dirname + '/public/views/upload_feedback.html');
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
})