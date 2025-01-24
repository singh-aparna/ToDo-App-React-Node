import { useContext, useState } from "react";
import "../App.css";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import axios from "axios";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loginerror, setLoginError] = useState(false);
    const user = useContext(UserContext);
    // async function login(e) {
    //     e.preventDefault();
    //    // const response = await fetch('http://localhost:3001/login', {//local
    //         const response = await fetch('https://to-do-app-react-node.vercel.app/login', {//server
    //         method: 'POST',
    //         body: JSON.stringify({ username, password }),
    //         headers: { 'Content-Type': 'application/json' },
    //         credentials: 'include',
    //     });
    //     if (response.ok) {
    //         response.json().then(userInfo => {
    //             setUserInfo(userInfo);
    //             setRedirect(true);
    //         });
    //     }
    //     else {
    //         alert('Wrong credentials');
    //     }
    // }
    //axios.post('http://localhost:3001/login', data, { withCredentials: true }
    async function login(e) {
        e.preventDefault();
        const data = { username, password };
        axios.post('https://to-do-app-react-node.vercel.app/login', data, { withCredentials: true }
        )
            .then(response => {
                user.setUsername(response.data.username);
                setUsername('');
                setPassword('');
                setLoginError(false);
                setRedirect(true);
                //console.log(response.data.username)
            })
            .catch(() => { setLoginError(true) })
    }
    if (redirect) {
        return <Navigate to={"/"} />
    }
    return (
        <form onSubmit={login} className="login">
            <h1>Login</h1>
            {loginerror && (
                <div>Login error! Wrong username or password!</div>
            )}
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    )
}
