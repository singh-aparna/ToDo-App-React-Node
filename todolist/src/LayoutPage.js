import { Outlet } from "react-router-dom";
import Header from "./Header";


export default function LayoutPage() {
    return (
        <div>
            <div style={{ backgroundColor: 'white', padding: '10px' }}><Header /></div>
            <Outlet />
        </div>
    )
}