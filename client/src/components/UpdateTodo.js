import React, {useState} from 'react'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'

const UpdateTodo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState(location.state.title)
    // const [description, setDescription] = useState(location.state.description);
    const [priority, setPriority] = useState(location.state.priority);

    const UpdateTask = async(e) => {
        e.preventDefault();
        console.log(typeof location.state._id);
        console.log(typeof location.state._id);
        try{
            const res = await fetch('/update/'+ location.state._id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title, priority
                })
            })
            const data = await res.json()
            console.log(data);
            if (!res.status === 200) {
                // eslint-disable-next-line
                throw new Error;
            }
            else{
                // window.alert("Task updated successfully")
                navigate('/');
              }
    
        }
        catch(e){
            console.log(e);
        }
        

    }

    return (
        <>
            <section>

                <div className="container mt-5">
                    <h2 className="text-white">Edit Todo</h2>
                    <form action="POST">

                        <div className="form-outline mb-4">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" name="title" className="form-control" id="title" autoComplete='off'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title" />

                        </div>

                        {/* <div className="form-outline mb-4">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" name="description" className="form-control" id="description" autoComplete='off'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description" />
                        </div> */}

                        <div className="form-outline mb-4">
                            <label htmlFor="priority" className="form-label text-white">Priority</label><br />
                            <input type="radio" name="priority" value="High" checked={2 === priority} id="high" onChange={() => setPriority(2)} />
                            <label htmlFor="high" className="text-white">High</label><br />
                            <input type="radio" name="priority" value="Medium" checked={1 === priority} id="Medium" onChange={() => setPriority(1)} />
                            <label htmlFor="medium" className="text-white">Medium</label><br />

                            <input type="radio" name="priority" value="low" checked={0 === priority} id="low" onChange={() => setPriority(0)} />
                            <label htmlFor="low" className="text-white">Low</label><br />


                        </div>
                        <button type="submit" name="addtask" id="addtask" className="btn btn-primary btn-block" value="addtask" onClick={UpdateTask}>Update Task</button>
                    </form>
                    <NavLink to="/">Go to Home</NavLink>
                </div>
            </section>
        </>
    )
}

export default UpdateTodo