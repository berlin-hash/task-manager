import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { MdRemoveCircleOutline } from "react-icons/md";
import { MdModeEdit, MdDoneOutline } from "react-icons/md";


const DisplayTodos = () => {
    
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    var index = 0;

    const displayTodos = async () => {
        try {
            const res = await fetch('/display', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()
            console.log(data);
            setTodos(data);
            if (!res.status === 200) {
                // eslint-disable-next-line
                throw new Error;
            }

        }
        catch (err) {
            console.log(err);

        }
    }


    const deleteTod = async (id) => {
        try {
            
            console.log(id);
            const res = await fetch('/delete/'+id, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            console.log(data);
            displayTodos();
            if (!res.status === 200) {
                // eslint-disable-next-line
                throw new Error;
            }

            
        } catch (error) {
            console.log(error);
        }
    }

    const updateTodo = async (id, completed) => {
        try{
            console.log(id, completed);
            if(completed === false) {
                completed = true;
            }
            else
                completed = false;
            const res = await fetch('/update/'+id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    completed
                })
            })
            if(!res.status === 200 ){
                // eslint-disable-next-line
                throw new Error;
            }
            displayTodos()
            navigate('/')
        }
        catch(err){
            console.log(err);
        }
    }
    const value = (status) => {
        if(status === true)
            return 'Completed';
        else
            return 'Incomplete';
    }

    const priorityValue = (priority) => {
        if(priority === 2)
            return 'High';
        else if(priority === 1)
            return 'Medium';
        else
            return 'Low'
    }

    const toUpdatePage = (ele) => {
        navigate('/updateTodo',{state: {_id: ele._id, title:ele.title,  priority: ele.priority, completed: ele.completed}} )
    }

    useEffect(() => {

        displayTodos();


    }, [])

    if(todos.length === 0){
        return (
            <>
                <div className="container mt-5 text-center">No todos to display</div>
            </>
        )
    }
    return (
        
        <>
            <div className="mt-5 container">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            {/* <th scope="col">Description</th> */}
                            <th scope="col">Priority</th>
                            <th scope="col">Status</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                            

                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((ele, i) => {
                                if(ele.completed === true){
                                    return (
                                        <>
                                                <tr key={ele._id} >
    
                                                    <th scope="row" >{index++}</th>
                                                    <td >{ele.title}</td>
                                                    {/* <td>{ele.description}</td> */}
                                                    <td>{priorityValue(ele.priority)}</td>
                                                    <td>
                                                    <input type="checkbox" id="status" name="status" value="status" checked={ele.completed} onChange={()=> updateTodo(ele._id,ele.completed)} />
                                                    </td>
                                                    <td><button className='btn btn-danger ' onClick={()=> deleteTod(ele._id)}><MdRemoveCircleOutline/></button>
                
                                                    </td>
                                                    <td><button className='btn btn-success' onClick={()=> toUpdatePage(ele)}><MdModeEdit/></button></td>
    
                                                </tr>
                                                
                                        </>
                                        
                                    )
                                }
                                
                                
                            })
                        }

                    </tbody>
                </table>
            </div>
            
        </>
    )
}

export default DisplayTodos