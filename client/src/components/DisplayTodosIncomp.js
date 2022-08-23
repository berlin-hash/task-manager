/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdRemoveCircleOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import '../home.css'
import '../component.css'
import high from "../images/high.png";
import medium from "../images/medium.png";
import low from "../images/low.png";



const DisplayTodos = () => {

    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);


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
            const res = await fetch('/delete/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
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
        try {
            console.log(id, completed);
            if (completed === false) {
                completed = true;
            }
            else
                completed = false;
            const res = await fetch('/update/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    completed
                })
            })
            if (!res.status === 200) {
                // eslint-disable-next-line
                throw new Error;
            }
            displayTodos()
            navigate('/')
        }
        catch (err) {
            console.log(err);
        }
    }


    const priorityValue = (priority) => {
        if (priority === 2)
            return high;
        else if (priority === 1)
            return medium;
        else
            return low;
    }

    const toUpdatePage = (ele) => {
        navigate('/updateTodo', { state: { _id: ele._id, title: ele.title, priority: ele.priority, completed: ele.completed } })
    }

    useEffect(() => {

        displayTodos();


    }, [])

    if (todos.length === 0) {
        return (
            <>
                <div className="container mt-5 text-center text-white">No todos to display</div>
            </>
        )
    }
    return (

        <>
            <div className="mt-5 container">
                <h3 className="text-white">Incomplete</h3>
                {
                    todos.map((ele, i) => {
                        if (ele.completed === false) {
                            return (
                                <>
                                    <div className='component-container mt-3 text-white'>

                                        {/* <div className="component-container">

                                            <div className="component-container1">
                                            <input type="checkbox" id="status" className="component-checkbox" name="status" value="status" checked={ele.completed} onChange={() => updateTodo(ele._id, ele.completed)} />

                                                <span className="component-text text-white">{ele.title}</span>
                                                <div className="icons">
                                                    <div className="component-button1 icon"><img src={priorityValue(ele.priority)} alt="priority" /></div>
                                                    <button className="component-button1 button btn btn-danger icon" onClick={() => deleteTod(ele._id)}><MdRemoveCircleOutline /></button>
                                                    <button className="component-button1 button btn btn-success icon " onClick={() => toUpdatePage(ele)}><MdModeEdit /></button>
                                                </div>

                                            </div>
                                        </div> */}
                                        <div className="component-c1">
                                            <div className="component-inline">
                                                <input type="checkbox" id="status" className="component-check" name="status" value="status" checked={ele.completed} onChange={() => updateTodo(ele._id, ele.completed)} />
                                            </div>

                                            <div className="component-text text-white">{ele.title}</div>
                                        </div>
                                        <div className="component-c2">
                                            <button className="component-button1 button btn btn-danger icon" title="Delete" onClick={() => deleteTod(ele._id)}><MdRemoveCircleOutline /></button>
                                            <button className="component-button1 button btn btn-success icon " title="Edit" onClick={() => toUpdatePage(ele)}><MdModeEdit /></button>
                                            <div className="component-button1 icon"><img src={priorityValue(ele.priority)} alt="priority" title="priority"/></div>
                                        </div>

                                    </div>
                                </>

                            )
                        }


                    })
                }


            </div>
            <div className="mt-5 container">
                <h3 className="text-white">Completed</h3>
                {
                    todos.map((ele, i) => {
                        if (ele.completed === true) {
                            return (
                                <>

                                    <div className='component-container mt-3 text-white'>

                                        
                                        <div className="component-c1">
                                            <div className="component-inline ">
                                                <input type="checkbox" id="status" className="component-check" name="status" value="status" checked={ele.completed} onChange={() => updateTodo(ele._id, ele.completed)} />
                                            </div>

                                            <div className="component-text text-strikethrough text-white">{ele.title}</div>
                                        </div>
                                        <div className="component-c2">
                                            <button className="component-button1 button btn btn-danger icon" title="Delete" onClick={() => deleteTod(ele._id)}><MdRemoveCircleOutline /></button>
                                            <button className="component-button1 button btn btn-success icon " title="Edit" onClick={() => toUpdatePage(ele)}><MdModeEdit /></button>
                                            <div className="component-button1 icon"><img src={priorityValue(ele.priority)} alt="priority" title="priority"/></div>
                                        </div>

                                    </div>




                                </>

                            )
                        }


                    })
                }



            </div>



        </>
    )
}

export default DisplayTodos