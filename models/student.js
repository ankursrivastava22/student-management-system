const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    classList: {
        type: String,
      
    },
    studentname: {
        type: String
      
    },
    
    fathername: {
        type: String
      
    },
    
    phone: {
        type: String
      
    },

    secret_key: {
        type: String,
        required:true,
      
    },
    
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Student = mongoose.model('student', StudentSchema)