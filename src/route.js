
const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

//const Message = require('./message');

const router = express.Router();

mongoose.connect(process.env.DB_CONNECT);



  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    console.log("Connection to Database Successful!");
     
    
      
  });

  const messageSchema = new Schema({
    user: String,
    message: String,
    createdAt: {type: Date, default: Date.now},
  });
 
  const message = mongoose.model('message', messageSchema);
  //message.deleteMany({user: 'zack'}).then(()=>console.log("deleted"));
    


router.get('/', (req, res) => {
    const query = message.find({});

    query.select('_id user message');

    
    query.exec(function (err, messages) {
    if (err) return handleError(err);
    // for (i in messages) {
    //     console.log(messages[i].user + ": " + messages[i].message);
    // }
    
    res.json(messages);
    });
});

router.post('/', async (req, res) => {
    try {
        const msg = new message(req.body);
        await msg.save(() => {
            console.log(msg.user + " wrote a message that was saved in the database");
        });
        res.json(req.body);
        console.log(req.body);

    } catch (error) {
        console.log(error);
    }
    
});



module.exports = router;