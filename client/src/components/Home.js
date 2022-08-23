import React from 'react'
import DisplayTodosIncomp from './DisplayTodosIncomp'
import {NavLink} from 'react-router-dom'


const Home = () => {
    return (
        <>

            <div className="container mt-5">
                <NavLink to='/create'>

                    <button type="" name="addtask" id="addtask" className="btn btn-info btn-block" value="addtask">Add Task</button>
                </NavLink>
            </div>
            <DisplayTodosIncomp/>
        </>
    )
}

export default Home