import "./Image/bgcover.jpg"
import Home from "./Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get('https://to-do-app-react-node.vercel.app/user', { withCredentials: true })
      .then((response) => { setUsername(response.data.username) })
  }, [])

  function logout(e) {
    e.preventDefault();
    axios.post('https://to-do-app-react-node.vercel.app/logout', {}, { withCredentials: true })
      .then(() => setUsername(''));
  }

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <BrowserRouter>
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
        <div className='bg-[url("./Image/bgcover.jpg")] bg-cover bg-center h-screen'>
          <main >
            <Routes>
              <Route path={"/"} element={<Home />}></Route>
              <Route path={"/login"} element={<LoginPage />}></Route>
              <Route path={"/register"} element={<RegisterPage />}></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider >
  );
}
export default App;
//relative px-8 md:px-64 py-10  h-screen bg-[url('./Image/bgcover.jpg')] bg-cover bg-center
//className='absolute inset-0 bg-white/0 backdrop-blur-sm'