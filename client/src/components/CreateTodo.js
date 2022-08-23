import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'

const CreateTodo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("0");

  const AddTask = async (e) => {
    e.preventDefault();

    const res = await fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'

      },
      body: JSON.stringify({
        title, priority
      })
    })

    const data = await res.json()

    console.log(data);
    if(! res.status === 200 || !data || title === ""){
      window.alert("Invalid details")
    }
    else{
      // window.alert("Task added successfully")
      navigate('/');
    }
  }


  return (
    <section>

      <div className="container mt-5">
        <h2 className="text-white">Create Todo</h2>
        <form action="POST">
          
          <div className="form-outline mb-4">
            <label htmlFor="title" className="form-label text-white">Title</label>
            <input type="text" name="title" className="form-control" id="title" autoComplete='off' 
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            placeholder="Title"/>

          </div>

          {/* <div className="form-outline mb-4">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" name="description" className="form-control" id="description" autoComplete='off'
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            placeholder="Description" />
          </div> */}

          <div className="form-outline mb-4">
            <label htmlFor="priority" className="form-label text-white">Priority</label><br/>
            <input type="radio" name="priority" value="high" id="high" onClick={() => setPriority('2')} />
            <label htmlFor="high" className="text-white"> High</label><br/>
            <input type="radio" name="priority" value="Medium" id="Medium" onClick={() => setPriority('1')} />
            <label htmlFor="medium" className="text-white"> Medium</label><br/>

            <input type="radio" name="priority" value="low" id="low" onClick={() => setPriority('0')} />
            <label htmlFor="low" className="text-white"> Low</label><br/>


          </div>
          <button type="submit" name="addtask" id="addtask" className="btn btn-primary btn-block" value="addtask" onClick={AddTask}>Add Task</button>
        </form>
          <NavLink to="/">Go to Home</NavLink>
      </div>
    </section>
  )
}

export default CreateTodo