import { Navigate, Outlet } from "react-router-dom";

function Required() {
    const id = localStorage.getItem("id");
    return(
        <>
        {
            id ? <Outlet></Outlet> : <Navigate to='/'/>
        }
        </>
    )
}

export default Required;