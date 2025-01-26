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
        //const data = { username, password };
        axios.post('https://to-do-app-react-node.vercel.app/register', { username, password }, { withCredentials: true }
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
