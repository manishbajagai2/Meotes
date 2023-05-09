
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"

import { device } from "../utils/device"
import { Toaster, toast } from "react-hot-toast"

import styled from "styled-components"
import NavBar from "../component/NavBar"
import BackgroundImage from "../component/BackgroundImage"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/signup")
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            toast.error("Please fill all the fields")
            return
        }
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password)
            toast.success("Signed in successfully")
        } catch (err) {
            toast.error(`${err.message}`)
        }
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) navigate("/")
        })
    }, [navigate])

    return (
        <Container>
            <Toaster />
            <NavBar linkText="/signup" text1="Sign up - it's free" />
            <BackgroundImage />
            <div className="content">
                <div className="form-container">
                    <div className="form">
                        <div className="title text-2xl font-semibold lg:text-3xl">
                            <h1>Sign In</h1>
                        </div>
                        <div>
                            <form onSubmit={handleLogin} className="container">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                />
                            <button type="submit" onClick={handleLogin}>Sign In</button>
                            <p style={{ color: "rgba(255,255,255, 0.5)" }}>
                                New to Meotes ?{" "}
                                <span onClick={goBack} className="signuptext">
                                    {" "}
                                    Sign up now
                                </span>{" "}
                            </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: relative;
    .content {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        .form-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            .form {
                padding: 2.5rem 2rem;
                width: 90%;
                @media ${device.tablet} {
                    width: 60%;
                    padding: 3.5rem;
                }
                @media ${device.laptop} {
                    width: 40%;
                }
                @media ${device.laptopL} {
                    width: 38%;
                }
                background-color: rgba(24, 42, 77, 0.6);
                border-radius: 5px;
                gap: 2rem;
                color: white;
                .title {
                    padding-bottom: 2rem;
                }
                .container {

                    gap: 2rem;
                    display: flex;
                    flex-direction: column;
                    font-size: 1.15rem;
                    input {
                        color: rgba(0, 0, 0, 0.7);
                        border-radius: 5px;
                        background: rgb(255, 255, 255);
                        padding: 0.8rem 1rem;
                        font-size: 1.15rem;
                        border: none;
                        &:focus {
                            outline: none;
                        }
                    }
                    input::placeholder {
                        font-size: 1.25rem;
                        color: rgba(0, 0, 0, 0.5);
                    }
                    @media ${device.tablet} {
                        input {
                            padding: 1.15rem;
                        }
                    }
                    button {
                        padding: 1rem;
                        background-color: #ff4500;
                        border: none;
                        cursor: pointer;
                        color: white;
                        border-radius: 0.2rem;
                        font-weight: bolder;
                        font-size: 1.05rem;
                    }
                    .signuptext {
                        color: rgba(255, 255, 255);
                        &:hover {
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
`

export default Login
