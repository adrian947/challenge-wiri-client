import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Layout } from "./layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />        
        <Route path='layout' element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
