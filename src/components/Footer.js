import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    const authToken = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };
    return (
        <div className="row mt-4">
            <div className="b-example-divider"></div>
            <div className="container">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item">
                            <Link to="/" className="nav-link px-2 text-muted">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/account" className="nav-link px-2 text-muted">My Account</Link>
                        </li>
                        {!authToken ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link px-2 text-muted" to="/signin">Signin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link px-2 text-muted" to="/signup">Signup</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="nav-link px-2 text-muted" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                    <p className="text-center text-muted">Write Hub © 2025 Company, Inc</p>
                </footer>
            </div>
        </div>
    );
};

export default Footer;