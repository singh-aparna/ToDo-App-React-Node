import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../UserContext";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const user = useContext(UserContext);

    function register(e) {
        e.preventDefault();
        const data = { username, password };
        axios.post('https://to-do-app-react-node.vercel.app/register', data, { withCredentials: true }
        )
            .then(response => {
                user.setUsername(response.data.username);
                setUsername('');
                setPassword('');
                setRedirect(true);
                console.log(response.data.username)
            })
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form action="" onSubmit={e => register(e)} className="register">
            <h1>Register</h1>
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Register</button>
        </form>
    )
}
//http://localhost:3001
//https://to-do-app-react-node.vercel.app

// async function register(e) {
//     e.preventDefault();
//     // try {

//     const response = await fetch('https://to-do-app-react-node.vercel.app/register', {//server
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//     })
//     if (response.ok) {
//         const userInfo = await response.json(); // Parse the JSON data
//         setUserInfo(userInfo);
//         setRedirect(true);
//         alert('Registration successful');
//     }
//     else { alert('Registration failed'); }
// .then((userInfo) => {
//     setUserInfo(userInfo);
//     setRedirect(true);
// })
// if (response) {
//     alert('Registration successful');
//else { alert('Registration failed'); }
//     if (response.ok) {
//         const userInfo = await response.json(); // Parse the JSON data
//         setUserInfo(userInfo);
//         setRedirect(true);
//         alert('Registration successful');
//     }
//     else { alert('Registration failed'); }
// }
// catch (err) {
//     console.error('Error during registration:', err);
//     alert('Registration failed: Network error or server unavailable');
