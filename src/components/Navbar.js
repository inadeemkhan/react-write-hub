import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const authToken = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    const handiAccountClick = (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem("token");
        if (!authToken) {
            navigate("/signin");
        } else {
            navigate("/account");
        }
    }

    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0">
                <div className="container-fluid">
                    <Link className="navbar-brand mx-2" to="/">
                        <img src="/write-hub-logo.png" alt="Logo" className="d-inline-block align-text-top" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light" onClick={handiAccountClick} to="/account">My Account</Link>
                            </li>

                            {!authToken ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/signin">Signin</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/signup">Signup</Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <button className="nav-link text-light btn btn-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>

                        <form className="d-flex justify-content-center align-items-center my-2" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;