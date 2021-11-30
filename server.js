const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const assocs = require("./routes/api/associations");
var cors = require('cors')

 


const app = express();
app.use(cors())
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

app.use(bodyParser.json());

const dbURL =  "mongodb+srv://Jacques1286:Jacques1286@cluster0.psewa.mongodb.net/myNinetyDatabase?retryWrites=true&w=majority";

//connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI || dbURL,
    { useUnifiedTopology:true, useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


const appointmentController = require('./routes/api/appointments')
const slotController = require('./routes/api/slots')
app.get('/appointments', appointmentController.all);
app.get('/retrieveSlots', slotController.all);
app.post('/appointmentCreate', appointmentController.create);
app.get('/appointmentByAssocs/:nameAssocs', appointmentController.one);

app.delete('/appointmentDelete/:id', appointmentController.delete);

// Routes
app.use("/api/users", users);
app.use("/api/associations", assocs);


if(process.env.NODE_ENV === 'production') {
   
  app.use(express.static(path.join(__dirname, "client", "build")))

  app.get('*',(req, res) => {
      res.sendFile(path.join(__dirname,'client','build','index.html'));
  });
}


const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server up and running on port ${port}`));