console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;
const clientfeedback = require('socket.io').listen(4040).sockets;
const clientfeedback1=require('socket.io').listen(4080).sockets;
const app = express();
const {exec}=require('child_process');
var cron = require('node-cron');
var nodemailer = require('nodemailer');

// serve files from the public directory
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url = 'mongodb://localhost:27017/blind';
// E.g. for option 2) above this will be:
// const url =  'mongodb://localhost:21017/databaseName';

MongoClient.connect(url, (err, database) => {
    if (err) {
        return console.log(err);
    }
        
    cron.schedule('*/0.5 * * * *',()=>{

        console.log('running a task every two minutes');
         exec('mk.bat',(err,stdout,stderr)=>{
             if(err)
             {
                 console.error(err);
                 return;
             }
             else 
             {
                console.log(stdout);
             }
         })
        })
    db = database;
    app.listen(8080, () => {
        console.log('listening to 8080');
    })
    clientfeedback.on('connection', function (socket) {
        console.log('Socket connected');

        let donate = db.collection('donate');

        // create function to send status//whenever we want to side something from servere side to client side we use emit to do so to show it in html file
        sendStatus = function (s) {
            socket.emit('status', s);
        }

        //get chats from mongo collection
        donate.find().limit(100).sort({_id:1}).toArray(function (err, res) {
            if (err) {
                throw err;
            }
            // emit the messages
            socket.emit('output', res);
        });
        // handle input events
        socket.on('input',function(data){
           let username= data.username;
           let ngoname = data.ngoname;

           // check for name and message
           if(username=='' || ngoname=='')
           {
               sendStatus('pls enter an address and status');
           }
           else{
               donate.insert({username:username,ngoname:ngoname},function(){
                   client.emit('output',[data]);

                   //send status object
                   sendStatus({
                       message:'Message sent',
                       clear:true
                   });

               });
           }
        });
        // handle clear
        socket.on('clear',function(data){
            //remove all chats from the collection
            street.remove({},function(){
               socket.emit('cleared');
            });
        });
    });
    clientfeedback1.on('connection', function (socket) {
        console.log('Socket connected');

        let feedback = db.collection('feedback');

        // create function to send status//whenever we want to side something from servere side to client side we use emit to do so to show it in html file
        sendStatus = function (s) {
            socket.emit('status', s);
        }

        //get chats from mongo collection
        feedback.find().limit(100).sort({ _id: 1 }).toArray(function (err, res) {
            if (err) {
                throw err;
            }
            // emit the messages
            socket.emit('output', res);
        });
        // handle input events
        socket.on('input', function (data) {
            let name = data.name;
            let message = data.message;

            // check for name and message
            if (name == '' || message == '') {
                sendStatus('pls enter an address and status');
            }
            else {
                feedback.insert({ name: name, message: message }, function () {
                    client.emit('output', [data]);

                    //send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });

                });
            }
        });
        // handle clear
        socket.on('clear', function (data) {
            //remove all chats from the collection
            street.remove({}, function () {
                socket.emit('cleared');
            });
        });
    });
   
    client.on('connection', function (socket) {
        console.log('Socket connected');

        let feedback = db.collection('feedback');

        // create function to send status//whenever we want to side something from servere side to client side we use emit to do so to show it in html file
        sendStatus = function (s) {
            socket.emit('status', s);
        }

        //get chats from mongo collection
        feedback.find().limit(100).sort({ _id: 1 }).toArray(function (err, res) {
            if (err) {
                throw err;
            }
            // emit the messages
            socket.emit('output', res);
        });
        // handle input events
        socket.on('input', function (data) {
            let name = data.name;
            let message = data.message;

            // check for name and message
            if (name == '' || message == '') {
                sendStatus('pls enter an address and status');
            }
            else {
                feedback.insert({ name: name, message: message }, function () {
                    client.emit('output', [data]);

                    //send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });

                });
            }
        });
        // handle clear
        socket.on('clear', function (data) {
            //remove all chats from the collection
            street.remove({}, function () {
                socket.emit('cleared');
            });
        });
    });
    console.log('Loading completed');
});
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'manmeetkaur18102000@gmail.com',
        pass: 'Gigobibo1#1'
    },
    tls: {
        rejectUnauthorized: true
    }
});

// serve the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.get('/signin', (req, res) => {
    res.sendFile(__dirname + '/public/signin.html');
});
app.get('/feedback', (req, res) => {
    res.sendFile(__dirname + '/public/feedback.html');
});
app.get('/feedback1', (req, res) => {
    res.sendFile(__dirname + '/public/feedback1.html');
});
app.get('/donate', (req, res) => {
    res.sendFile(__dirname + '/public/donate.html');
});
app.get('/helpers', (req, res) => {
    res.sendFile(__dirname + '/public/helpers.html');
});
app.get('/contactus', (req, res) => {
    res.sendFile(__dirname + '/public/contact-us.html');
});


// add a document to the DB collection recording the click event
app.post('/register', (req, res) => {
    console.log(req.body);
    var signin = req.body;

    db.collection('signin').find().sort({ userid: -1 } ).limit(1).toArray(function (err, resLoc) {

        if (resLoc.length > 0) {
            signin.userid = parseInt(resLoc[0].userid) + 1;
        }
        else {
            signin.userid = 1;
        }


        db.collection('signin').save(signin, (err, result) => {
            if (err) {
                return console.log(err);
            }
            let HelperOptions = {
                from: '"Manmeet kaur"<manmeetkaur18102000@gmail.com>',
                to: signin.useremail,
                subject: "your user id for using our portal to locate consultant is" + signin.userid + " Use this to login in the future",
                text: 'wow',

            };
            transporter.sendMail(HelperOptions, (error, info) => {
                if (error) {
                    console.log(error);

                }

                console.log("message sent");
            });


            console.log('click added to db');
            res.status(200).send(result);
        });
    });
});
app.post('/donateinfo', (req, res) => {
    console.log(req.body);
    var donate = req.body;


        db.collection('donate').save(donate, (err, result) => {
            if (err) {
                return console.log(err);
            }

            console.log('click added to db');
            res.status(200).send(result);
        });
});
app.post('/send', (req, res) => {
    console.log(req.body);
    var feedback = req.body;


        db.collection('feedback').save(feedback, (err, result) => {
            if (err) {
                return console.log(err);
            }

            console.log('click added to db');
            res.status(200).send(result);
        });
});

app.get('/map', (req, res) => {
    console.log(req.query);

    db.collection('signin').find({ "userid": parseInt(req.query.userid), "userPassword": req.query.userpassword }).limit(100).sort({ _id: 1 }).toArray(function (err, resUser) {
        if (err) {
            throw err;
        }
        if (resUser.length > 0) {

            db.collection('location').find({ "userid": parseInt(req.query.userid) }).limit(100).sort({ _id: 1 }).toArray(function (err, resLoc) {
                if (err) {
                    throw err;
                }
                // emit the messages
                res.json({
                    'location': resLoc
                });
            });
        }
        else {
            // emit the messages
            res.json({
                'location': resUser
            });
        }
    });
});