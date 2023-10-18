import Dashboard from "./pages/dashboard";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setData } from "./redux/usersSlice";
import { Navigate, Route, Routes, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Account from "./pages/account";
import Required from "./components/required";

const router = createBrowserRouter([
  {path: '/', element: <Home></Home>},
  {path: '/dashboard', element: <Required></Required>, children: [
    {path: '/dashboard', element:<Dashboard></Dashboard>},
    {path: 'profile', element:<Account></Account>}
  ]}
]);

function App() {
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();
  // console.log(id);
  const keepLogin = async () => {
    try{
        const response = await axios.get(`http://localhost:2000/users/${id}`)
        dispatch(setData(response.data));
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    keepLogin();
  }, [])

  return (
    <div className="App">
      {/* <Routes>
          <Route path="/" element={id ? <Navigate to={'/dashboard'}/> : <Home></Home>}></Route>  
          <Route path="/dashboard" element={id ? <Dashboard></Dashboard> : <Navigate to="/"/>}></Route>
          <Route path="/profile" element={id ? <Account></Account> :  <Navigate to="/"/>}></Route>
        </Routes> */}
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
