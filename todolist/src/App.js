import "./Image/bgcover.jpg"
import Home from "./Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import LayoutPage from "./LayoutPage";
import { UserContextProvider } from "./UserContext";
import { useState } from "react";

function App() {
  const [username, password]=useState('');
  return (
    <div className="relative bg-[url('./Image/bgcover.jpg')] bg-cover bg-center h-screen">
      <UserContextProvider value={{username, password}}>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<Home />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            {/* <Route path={"/create"} element={<Home />} /> */}
          </Route>
        </Routes>
      </UserContextProvider>

    </div>
  );
}
// #99aaff
// #32d489
export default App;
//relative px-8 md:px-64 py-10  h-screen bg-[url('./Image/bgcover.jpg')] bg-cover bg-center
//className='absolute inset-0 bg-white/0 backdrop-blur-sm'