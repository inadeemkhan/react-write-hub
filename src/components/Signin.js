import React, { useState } from 'react';

const Signin = () => {
    const baseUrl = "http://localhost:7700/customer/account";

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(""); // reset any previous message

        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const jsonData = await response.json();
            localStorage.setItem("token", jsonData.token);

            const authToken = localStorage.getItem("token");

            if (authToken) {
                setMessage("Login successful. Redirecting...");
                setMessageType("success");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                setMessage("Login failed: Token not received");
                setMessageType("error");
            }

        } catch (error) {
            setMessage(error.message || "Login failed");
            setMessageType("error");
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow rounded-3 px-3 py-3">
                    <div className="card-body">
                        <h1 className='text-center'>Sign In</h1>
                        <p className='text-center'>Please enter your email and password to sign in.</p>
                        <hr />

                        {/* Message box */}
                        {message && (
                            <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;