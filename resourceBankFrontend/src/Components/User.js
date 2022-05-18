import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "./UseFetch";

const User = ({setProfile}) => {


    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [registered, setRegistered] = useState(false);
    const [choice, setChoice] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const history = useHistory();

    
    console.log(username)
    console.log(password)


    const handleSignUp = (event) => {
        event.preventDefault();
        const user_data = {  username, password };
        setRegistered(true);
        fetch("http://localhost:8000/credential/user/signup", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user_data)
        }).then((res)=>{
            if(res.status!==200)
                throw new Error("Unauthorized")

            setRegistered(false);
            setProfile(true);
            history.push("/")}
        )
        .catch((err)=>{
            setRegistered(false);;
            setIsValid(true)
        })
    }   

    const handleSignIn =(event)=>{
        event.preventDefault();
        const user_data = {  username, password };

        console.log(user_data)

        setRegistered(true);
        fetch("http://localhost:8000/credential/user/signin", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user_data)
        }).then((res)=>{
            if(res.status!==200)
                throw new Error("Unauthorized")
            setRegistered(false);
            setProfile(true);
            history.push("/")}
        )
        .catch((err)=>{
            setRegistered(false);;
            setIsValid(true)})

        

        }


    return (

        <div className="signup-content">
            <div className="login-box">
                <h2>RESOURCE BANK</h2>
                { !choice && 
                <form onSubmit={handleSignUp} className="form">
                    <div className="textbox">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="textbox">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {!registered && <button className="btn btn-outline-success" type="submit" style={{ color: "white" }}><i className="fa fa-fw fa-user"></i>SignUp</button>}
                    {registered && <button className="btn btn-outline-success" type="submit" style={{ color: "white" }} disabled><i className="fa fa-fw fa-user"></i>Signing..</button>}
                    {isValid && <p style={{color:"red"}} >Invalid username or password !</p> }
                    <button className="btn btn-outline-success" onClick={()=>setChoice(true)}>Login</button>
                </form>
                }

                { 
                choice && 
                <form onSubmit={handleSignIn}>
                    
                    <div className="textbox">
                        <i className="fas fa-user"></i>
                        <input
                            type="email"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            
                        />
                    </div>
                    <div className="textbox">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {isValid && <p style={{color:"red"}} >Invalid username or password !</p> }
                    {!registered && <button className="btn btn-outline-success" type="submit" style={{ color: "white" }} ><i className="fa fa-fw fa-user"></i>Login</button>}
                    {registered && <button className="btn btn-outline-success" type="submit" style={{ color: "white" }} disabled><i className="fa fa-fw fa-user"></i>Loging...</button>}
                    <button className="btn btn-outline-success" onClick={()=>setChoice(false)}>Create Account</button>
                </form>}


            </div>
        </div>

    );
}

export default User;

