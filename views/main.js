const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studentDB",{useNewUrlParser: true , useUnifiedTopology: true});

const studentSchema = new mongoose.Schema({
    userID : String,
    password : String,
    class: Number,
    event: String
});

const Student =mongoose.model("Student",studentSchema);

const student = new Student ({
    userID : "jay_17",
    password : "vghbnjkm",
    class : 8,
    event: "Math_bee"
});
//student.save();