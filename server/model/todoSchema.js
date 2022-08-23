mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  title:{
      type: String,
      required: true
  }  ,
  // description: {
  //     type: String,
  //     required: true
  // },
  priority:{
      type: Number,
      default: 0,
  },
  completed: {
    type: Boolean,
    default: false 
  }
})

const Todo = mongoose.model('TODO',TodoSchema)
module.exports = Todo