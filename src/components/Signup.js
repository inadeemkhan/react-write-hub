import React from 'react'

const Signup = () => {
    return ( 
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow rounded-3 px-3 py-3">
                    <div className="card-body">
                    <h1 className='text-center'>Sign Up</h1>
                    <p className='text-center'>Please enter below details to sign up.</p>
                    <hr />
                    <form>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">Firstname</label>
                            <input type="text" className="form-control" id="firstname" name="firstname" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Lastname</label>
                            <input type="text" className="form-control" id="lastname" name="lastname" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" required />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Sign up</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;