const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
username: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
},
first_name:{
    type: String,
    required: "your firstname is required",
    max: 25,
}, 
last_name:{
    type: String,
    required: "your lastname is required",
    max: 25,
},
role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
},
email: {
    type:String,
    required: true,
    unique: true,
    validate: {
        validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'please enter a valid email number'
    },
}

}); 
const User = mongoose.model('User', UserSchema);
module.exports = User;