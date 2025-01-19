import "./Image/bgcover.jpg"
import Home from "./Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import LayoutPage from "./LayoutPage";
import { UserContextProvider } from "./UserContext";
//import WelcomePage from "./pages/WelcomePage";
//import IndexPage from "./pages/IndexPage";

function App() {
  return (
    <div className="relative bg-[url('./Image/bgcover.jpg')] bg-cover bg-center h-screen">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<LoginPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/create"} element={<Home />} />
            {/* <Route path={"/thanks"} element={<WelcomePage />} /> */}

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