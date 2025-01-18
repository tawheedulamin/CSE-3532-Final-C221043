import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
            <img src="/Logo.png" alt="" className="h-9" />
            </div>
            <div className="navbar-center">
            <button className=" p-2 bg-orange-200 rounded-lg">Sort by View</button>

            </div>
            <div className="navbar-end">
            <button className="btn btn-error text-white">Blog</button>

            </div>
        </div>
    )
}

export default Navbar
