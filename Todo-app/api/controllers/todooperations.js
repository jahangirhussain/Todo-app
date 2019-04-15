var mongoose = require('mongoose');
var Todo=require('../models/todo.js')
var Todo=mongoose.model('Todo')
var datetime = require('node-datetime');
 


module.exports.deletetodo=function(req,res)
{
   
    Todo.findOneAndRemove({_id: req.param('todo_id')})
    .exec(function (err, todos) {
        if (err){
          if(err.kind === 'ObjectId') {
            return res.status(404).send({
              message: " not found with given user " 
            });                
          }

          return res.status(500).send({
            message: "Error delete todos with given Id  "
            });
        }
   
     
        res.json(todos).status(200);
      })



   
}


module.exports.getUsertodos = function(req, res)
 {
    Todo.find({ user : req.param('user_id') })
    .exec(function (err, todos) {
      if (err){
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: " not found with given user " 
          });                
        }
        return res.status(500).send({
          message: "Error retrieving todos with given user  "
          });
      }
            
      res.json(todos).status(200);
    });

 }
module.exports.addtodo = function(req, res)
 {
        time=Date.now()
        var asd= req.body.new_todo;
        var id= req.body.user_id;
        dt = datetime.create();
        var formatted = dt.format('d-n-Y H:M:S');
        const createtodo= new Todo({
         todostatement:asd,
         created_at: formatted,
         user:id,        
   });
    createtodo.save();
    createtodo.on('save', function(recentadded) { 
    res.status(200).json(recentadded);
    });

 }
    
    
    
  