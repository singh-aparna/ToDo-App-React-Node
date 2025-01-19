import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
//import LoginPage from "./pages/LoginPage";
//import Home from "./Home";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    // const [redirect, setRedirect] = useState(false);//addbyme

    useEffect(() => {
        // fetch('https://localhost:3001/profile', {//local
        fetch('https://to-do-app-react-node.vercel.app/profile', {//server
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [])
    function logout() {
        // fetch('https://localhost:3001/logout', {//local
        fetch('https://to-do-app-react-node.vercel.app/logout', {//server
            credentials: 'include',
            method: "POST",
        })
            // setUserInfo(null);
            // setRedirect(true); 

            .then(() => {
                setUserInfo(null); // Clear user info
                navigate("/"); // Redirect to home page after logout
            })
            .catch(error => {
                console.error("Logout error:", error);
            });
    }
    const username = userInfo?.username;


    return (
        <header className='flex gap-8 justify-center items-center'>
            <h2 className='font-bold text-xl'><Link>To-Do List</Link></h2>
            {username && (
                <>
                    <Link to={"/create"}>Add Task</Link>
                    <a onClick={logout}>Logout</a>
                </>
            )}
            {!username && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </header>
    )
}