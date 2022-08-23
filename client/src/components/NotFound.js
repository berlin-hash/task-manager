import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="container mt-5 d-flex p-2">
                <div>
                    <h2>Not found</h2>

                </div>
                <div>

                </div>
            </div>
            <div className="belowSubmit">

                <NavLink to="/">back to home page</NavLink>
            </div>

        </>
    )
}

export default NotFound

