import React, { useState, useEffect } from 'react'
import './index.less'
import pngurl1 from '../../Pic/monitorProcess.webp'
import pngurl2 from '../../Pic/contact.webp'
import pngurl3 from '../../Pic/tutorial.webp'
import pngurl4 from '../../Pic/game.webp'
import pngurl5 from '../../Pic/workoutPlan.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'
import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { message } from 'antd'
export default function Login() {
    const [focusedname, setFocusedname] = useState(false)
    const [focusedpassword, setFocusedpassword] = useState(false)
    const [focusednameSup, setFocusednameSup] = useState(false)
    const [focusedpasswordSup, setFocusedpasswordSup] = useState(false)
    const [focusedemail, setFocusedemail] = useState(false)
    const [selectedPic, setSelectedPic] = useState(1)
    const [signup, setSignup] = useState(false)
    const [sigInInfo, setSignInInfo] = useState({})
    const [sigUpInfo, setSignUpInfo] = useState({})
    const activename = focusedname ? 'active' : ''
    const activepassword = focusedpassword ? 'active' : ''
    const activenameSup = focusednameSup ? 'active' : ''
    const activepasswordSup = focusedpasswordSup ? 'active' : ''
    const activeemail = focusedemail ? 'active' : ''


    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const timer = window.setInterval(() => {
            setSelectedPic((prev) => {
                return prev !== 5 ? prev + 1 : 1
            })
        }, 3000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const registerUser = async () => {
        dispatch(loginStart())
        await axios.post('http://localhost:3001/api/auth/signup', sigUpInfo, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                dispatch(loginSuccess(res.data))
                navigate('/dashboard')
                message.success('Register Successfully! Have a nice trip!!!')
            })
            .catch(() => {
                dispatch(loginFailure())
                message.error('Registration Failure! Try again please')
            })
    }

    const UserSignIn = async () => {
        await axios.post('http://localhost:3001/api/auth/signin', sigInInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                dispatch(loginSuccess(res.data))
                navigate('/dashboard')
                message.success('Login Successfully! Welcome Back!!!')
            })
            .catch(() => {
                dispatch(loginFailure())
                message.error('Login Failure! Try again please')
            })
    }
    const SignInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth, provider)
            .then((res) => {
                axios.post('http://localhost:3001/api/auth/google', {
                    name: res.user.displayName,
                    email: res.user.email,
                    avator: res.user.photoURL,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((res) => {
                    dispatch(loginSuccess(res.data))
                    navigate('/dashboard')
                    message.success('Login Successfully! Welcome Back!!!')
                })
            })
            .catch(() => {
                dispatch(loginFailure())
                message.error('Login with Google failure! Try again please')
            })
    }
    return (
        <main className={signup ? 'sign-up-mode' : ''}>
            <div className='box'>
                <div className='inner-box'>
                    <div className='forms-wrap'>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            UserSignIn()
                        }} autoComplete="off" className='sign-in-form'>
                            <div className='logo'>
                                {/* img */}
                                <h4>Medal - FitnessApp</h4>
                            </div>
                            <div className='heading'>
                                <h2>Welcome Back</h2>
                                <h6>Not registered yet?</h6>
                                <a className='toggle' onClick={() => setSignup(true)}>&nbsp;Sign up</a>
                            </div>
                            <div className='actual-form'>
                                <div className='input-wrap'>
                                    <input
                                        type='text'
                                        minLength={4}
                                        className={`input-field ${activename}`}
                                        onFocus={() => setFocusedname(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusedname(false)
                                        }}
                                        onChange={({ target: { value } }) => setSignInInfo({ ...sigInInfo, name: value })}
                                        autoComplete="off"
                                        required
                                    />
                                    <label>Name</label>
                                </div>
                                <div className='input-wrap'>
                                    <input
                                        type='password'
                                        minLength={4}
                                        onFocus={() => setFocusedpassword(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusedpassword(false)
                                        }}
                                        onChange={({ target: { value } }) => setSignInInfo({ ...sigInInfo, password: value })}
                                        className={`input-field ${activepassword}`}
                                        autoComplete="off"
                                        required
                                    />
                                    <label>Password</label>
                                </div>
                                <input type='submit' value="Sign In" className='sign-btn' />
                                <input onClick={SignInWithGoogle} type='submit' value="Sign In With Google" className='sign-btn' />
                                <p className='text'>
                                    Forgotten your password or you login details?
                                    <a>Get help</a> signing in
                                </p>
                            </div>
                        </form>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            registerUser()
                        }} autoComplete="off" className='sign-up-form'>
                            <div className='logo'>
                                {/* img */}
                                <h4>FitnessApp</h4>
                            </div>
                            <div className='heading'>
                                <h2>Get Started</h2>
                                <h6>Already have an account?</h6>
                                <a className='toggle' onClick={() => setSignup(false)}>&nbsp;Sign in</a>
                            </div>
                            <div className='actual-form'>
                                <div className='input-wrap'>
                                    <input
                                        type='text'
                                        minLength={4}
                                        className={`input-field ${activenameSup}`}
                                        onFocus={() => setFocusednameSup(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusednameSup(false)
                                        }}
                                        onChange={({ target: { value } }) => setSignUpInfo({ ...sigUpInfo, name: value })}
                                        autoComplete="off"
                                        required
                                    />
                                    <label>Name</label>
                                </div>
                                <div className='input-wrap'>
                                    <input
                                        type='email'
                                        minLength={4}
                                        className={`input-field ${activeemail}`}
                                        onFocus={() => setFocusedemail(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusedemail(false)
                                        }}
                                        onChange={({ target: { value } }) => setSignUpInfo({ ...sigUpInfo, email: value })}
                                        autoComplete="off"
                                        required
                                    />
                                    <label>Email</label>
                                </div>
                                <div className='input-wrap'>
                                    <input
                                        type='password'
                                        minLength={4}
                                        onFocus={() => setFocusedpasswordSup(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusedpasswordSup(false)
                                        }}
                                        className={`input-field ${activepasswordSup}`}
                                        autoComplete="off"
                                        onChange={({ target: { value } }) => setSignUpInfo({ ...sigUpInfo, password: value })}
                                        required
                                    />
                                    <label>Password</label>
                                </div>
                                <input type='submit' value="Sign Up" className='sign-btn' />
                                <p className='text'>
                                    By signing up, I agree to the <a>Terms of Services</a>and
                                    <a style={{ cursor: 'pointer' }}>Privacy policy</a>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className='carousel'>
                        <div className='images-wrapper'>
                            <img src={pngurl1} className={`image img-1 ${selectedPic === 1 && "show"}`}></img>
                            <img src={pngurl2} className={`image img-2 ${selectedPic === 2 && "show"}`}></img>
                            <img src={pngurl3} className={`image img-3 ${selectedPic === 3 && "show"}`}></img>
                            <img src={pngurl4} className={`image img-4 ${selectedPic === 4 && "show"}`}></img>
                            <img src={pngurl5} className={`image img-5 ${selectedPic === 5 && "show"}`}></img>
                        </div>
                        <div className='text-slider'>
                            <div className='text-wrap'>
                                <div className='text-group' style={{ transform: `translateY(${-(selectedPic - 1) * 2.2}rem)` }}>
                                    <h2>Track your workout prograss</h2>
                                    <h2>Contact with your friends</h2>
                                    <h2>Watch the rich tutorial library</h2>
                                    <h2>Gamification features</h2>
                                    <h2>Personalized Exercise Plan</h2>
                                </div>
                            </div>
                            <div className='bullets'>
                                <span className={selectedPic === 1 ? `active` : ''} onClick={() => setSelectedPic(1)}></span>
                                <span className={selectedPic === 2 ? `active` : ''} onClick={() => setSelectedPic(2)}></span>
                                <span className={selectedPic === 3 ? `active` : ''} onClick={() => setSelectedPic(3)}></span>
                                <span className={selectedPic === 4 ? `active` : ''} onClick={() => setSelectedPic(4)}></span>
                                <span className={selectedPic === 5 ? `active` : ''} onClick={() => setSelectedPic(5)}></span>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </main >
    )
}
