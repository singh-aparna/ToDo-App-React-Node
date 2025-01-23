import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function register(e) {
        e.preventDefault();
        try {
           // const response = await fetch('http://localhost:3001/register', {//local
                const response = await fetch('https://to-do-app-react-node.vercel.app/register', {//server
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            if (response.ok) {
                const userInfo = await response.json(); // Parse the JSON data
                setUserInfo(userInfo);
                setRedirect(true);
                alert('Registration successful');
            }
            else { alert('Registration failed'); }
        }
        catch (err) {
            console.error('Error during registration:', err);
            alert('Registration failed: Network error or server unavailable');
        }
    }
    if (redirect) {
        return <Navigate to={'/login'} />
    }
    return (
        <form onSubmit={register} className="register">
            <h1>Register</h1>
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Register</button>
        </form>
    )
}