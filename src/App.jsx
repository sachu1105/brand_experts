import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
import Layout from "./components/LayOut";
import Home from "./pages/home/Home";
import Templates from "./pages/betemplates/Templates";
import Cart from "./pages/cart/Cart";
import Register from "./pages/loginSignin/Register";
import Login from "./pages/loginSignin/Login";
import Warranty from "./pages/warranty/Warranty";
import Products from "./pages/products/Products";

const queryClient = new QueryClient(); // Create Query Client

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="overflow-hidden">
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/products" element={<Products />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
};

export default App;
