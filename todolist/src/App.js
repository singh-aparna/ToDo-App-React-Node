import "./Image/bgcover.jpg"
import Home from "./Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";

function App() {
  const [username, setUsername] = useState("");

  //const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  //axios.get('http://localhost:3001/user', { withCredentials: true })
  useEffect(() => {
    axios.get('https://to-do-app-react-node.vercel.app/user', { withCredentials: true })
      .then((response) => { setUsername(response.data.username) })
      // Update username if logged in
      .catch(() => {
        setUsername(null); // Handle any errors
      })

  }, [])


  // function logout(e) {
  //   e.preventDefault();
  //   //fetch('https://to-do-app-react-node.vercel.app/logout', { withCredentials: true }, {
  //   fetch('http://localhost:3001/logout', { withCredentials: true }, {

  //     credentials: 'include',
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //   }).then(() => {
  //     setUsername(""); // Clear user info
  //    // navigate("/") ; // Redirect to home page after logout
  //   })


  //   // .catch(error => {
  //   //   console.error("Logout error:", error);
  //   // });
  // }

  function logout() {
    axios.post('https://to-do-app-react-node.vercel.app/logout', {}, { withCredentials: true })
      .then(() => setUsername(''));
  }

  return (
    <div className="relative bg-[url('./Image/bgcover.jpg')] bg-cover bg-center h-screen">
      <UserContext.Provider value={{ username, setUsername }}>

        <nav>
          <Link to={"/"}>Home</Link>
          {!username && (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
          {!!username && (
            <>
              <a onClick={logout}>Logout</a>
            </>
          )}
        </nav>
        <main>
          <Routes>
            <Route path={"/"} element={<Home />}></Route>
            <Route path={"/login"} element={<LoginPage />}></Route>
            <Route path={"/register"} element={<RegisterPage />}></Route>
          </Routes>
        </main>

      </UserContext.Provider >
    </div>
  );
}
// #99aaff
// #32d489
export default App;
//relative px-8 md:px-64 py-10  h-screen bg-[url('./Image/bgcover.jpg')] bg-cover bg-center
//className='absolute inset-0 bg-white/0 backdrop-blur-sm'