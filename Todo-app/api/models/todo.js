
var mongoose = require( 'mongoose' );

const users = require('../models/users.js');
Schema = mongoose.Schema;
const todoSchema = mongoose.Schema({
  todostatement: String,
  created_at: Date,
  user : { type: Schema.Types.ObjectId, ref: 'users' }
 
});

module.exports = mongoose.model('Todo', todoSchema);
