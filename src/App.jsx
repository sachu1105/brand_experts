import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/LayOut";
import Home from "./pages/home/Home";
import Templates from "./pages/betemplates/Templates";
import Cart from "./pages/cart/Cart";
import Login from "./pages/loginSignin/Login";
import Signin from "./pages/loginSignin/Signin";
import RegisterWarranty from "./pages/warranty/RegisterWarranty";
import CreateWarranty from "./pages/warranty/CreateWarranty";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/register-warranty" element={<RegisterWarranty />} />
            <Route path="/create-warranty" element={<CreateWarranty />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
