const express = require('express')
const router = express.Router()

const Todo = require('../model/todoSchema')

router.get('/display',async (req,res) => {
    try{
        const todos = await Todo.find().sort({priority: -1});
        res.send(todos)
    }
    catch(err){
        res.send(err) 
    }
})

router.post('/',async (req, res) => {
    try{
        const todo = await new Todo(req.body).save()
        res.send(todo)
    }
    catch(err){
        res.send(err )
    }
})

router.put('/update/:id', async (req, res) => {
    try{
        const task = await Todo.findOneAndUpdate(
            {_id: req.params.id},
            req.body
        )
        res.send(task)
    }
    catch(err){
        res.send(err)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const task = await Todo.findByIdAndDelete(req.params.id)
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})

router.post('/add', async (req, res) => {
    const {title, description, priority, completed} = req.body;
    
    try{
        const todo = await new Todo({title, priority, completed})
        await todo.save();
        console.log("task submitted successfully");
        res.status(200).json({ message: 'Task added successfully' })
    }
    catch (error) {
        res.send(error)
    }
})

router.post('/remove', async (req, res) => {
    const {title, priority, completed} = req.body;

})
module.exports = router