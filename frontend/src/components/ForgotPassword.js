import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword(props) {
    
    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth) {
            alert('User Already LoggedIn')
            Navigate("/")
        }
    })
    const [data, setData] = useState("");
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")
    const Navigate = useNavigate();

    // useEffect(() => {
    //     console.log(message)
    // }, [message]);


    const sendOtp = async (e) => {
        e.preventDefault();
        console.warn("username", username)
        let result = await fetch('http://localhost:4000/auth/forgotpassword', {
            method: 'post',
            body: JSON.stringify({ username }),
            headers: {
                'content-type': 'application/json'
            }
        })
        // .then((res) => res.text())
        // .then((data) => setMessage(data)).catch(e => console.log(e))
        // .catch(error => console.log('error', error));
        result = await result.json();// as it return promise to we use await
        if (result) {
            console.log(result)
            localStorage.setItem('fpass_sec_token', JSON.stringify(result))
            alert("Plese check your Email")
            // Navigate('/SignIn')
        }else{
            alert("User Not Found")
        }
    }

    const handleOtp = async (e) => {
        e.preventDefault();
        console.warn("otp,password", otp, password)
        let result1 = await fetch('http://localhost:4000/auth/submitpassword', {
            method: 'post',
            body: JSON.stringify({ otp, password }),
            headers: {
                'content-type': 'application/json'
            }
        })
        // .then((res) => res.text())
        // .then((data) => setMessage(data)).catch(e => console.log(e))
        // .catch(error => console.log('error', error));
        result1 = await result1.json();// as it return promise to we use await
        // console.warn(result)
        // console.log(data)
        // console.log(message)
        if (result1) {
            alert("Password Changed Successfully");
            localStorage.getItem('otp', JSON.stringify(result1))
            Navigate('/SignIn')
        }else{
            alert("Invalid Otp");
        }
    }


    return (
        // <div container="true" my-3="true" col-md-5="true" mx-auto="true">
        <div className="container  my-3 col-md-5 mx-auto">
            {/* <!-- Pills navs --> */}
            <ul className="nav nav-pills nav-justified mb-3 " id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" id="tab-login" data-mdb-toggle="pill" to="/ForgotPassword" role="tab"
                        aria-controls="pills-login" aria-selected="true">Forgot Password</Link>
                </li>

            </ul>
            {/* <!-- Pills content --> */}
            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form>
                        {/* <!-- UserName input --> */}
                        <div className="form-outline mb-4">
                            <input type="text" id="username" className="form-control"
                                value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label className="form-label" htmlFor="username">Username</label>
                            <div><button onClick={sendOtp} type="submit" className="btn btn-primary btn-block mb-4">Send </button></div>
                        </div>
                        {/* <!-- OTP input --> */}
                        <div className="form-outline mb-4">
                            <input type="text" id="otp" className="form-control"
                                value={otp} onChange={(e) => setOtp(e.target.value)} />
                            <label className="form-label" htmlFor="username">OTP</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-4">
                            <input type="password" id="password" className="form-control" autoComplete="on"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label className="form-label" htmlFor="password">Password</label>
                        </div>

                        {/* <!-- Username input(2) --> */}
                        {/* <div className="form-outline mb-4">
                            <input type="text" id="loginName" className="form-control"
                                onChange={(e) => setUsername(e.target.value)} value={username} />
                            <label className="form-label" htmlFor="loginName">Email or username</label>
                        </div> */}

                        {/* <!-- Password input(2) --> */}
                        {/* <div className="form-outline mb-4">
                            <input type="password" id="loginPassword" className="form-control"
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                            <label className="form-label" htmlFor="loginPassword">Password</label>
                        </div> */}

                        {/* <div className="form-group">
                                <label htmlFor="username" className="text-info" >username</label><br />
                                <input id="username" className="form-control" name="username" value={loginData.username} onChange={handleInput} />
                            </div> */}
                        {/* <div className="form-group mt-3">
                                <label htmlFor="password" className="text-info">Password:</label
                                ><br />
                                <input id="password" className="form-control" name="password" value={loginData.password} onChange={handleInput} />
                            </div> */}

                        {/* <!-- 2 column grid layout --> */}
                        <div className="row mb-4">
                            <div className="col-md-3 d-flex justify-content-center">
                                {/* <!-- Simple link --> */}
                                <Link to="/SignIn">Back To SignIn</Link>
                            </div>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button onClick={handleOtp} type="submit" className="btn btn-primary btn-block mb-4">Reset </button>

                        {/* <!-- Submit button(2) --> */}
                        {/* <button onClick={handleSignin} type="submit" className="btn btn-primary btn-block mb-4">Sign in</button> */}


                        {/* <!-- Register buttons --> */}
                        <div className="text-center">
                            <p>Not a member? <Link to="/SignUp">Register</Link></p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        // </div>
    )
}
export default ForgotPassword;