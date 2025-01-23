import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        //fetch('http://localhost:3001/profile', {//local
         fetch('https://to-do-app-react-node.vercel.app/profile', {//server
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [])
    function logout() {
        //fetch('http://localhost:3001/logout', {//local
         fetch('http://to-do-app-react-node.vercel.app/logout', {//server
            credentials: 'include',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
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
            <h2 className='font-bold text-xl'><Link to={'/'}>To-Do List</Link></h2>
            {!!username && (
                <>
                    {/* <Link to={"/create"}>Add Task</Link> */}
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