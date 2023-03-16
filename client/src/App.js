import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Hotel from "./pages/Hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path="hotels" element={<List/>}/>
         <Route path="hotels/:id" element={<Hotel/>}/>
         <Route path="login" element={<Login/>}/>
      </Route>
    </Routes>
  );
}

export default App;
