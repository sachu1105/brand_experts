import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/LayOut";
import Home from "./pages/home/Home";
import Templates from "./pages/betemplates/Templates";
import Cart from "./pages/cart/Cart";
import Register from "./pages/loginSignin/Register";
import Login from "./pages/loginSignin/Login";
import Warranty from "./pages/warranty/Warranty";
import Products from "./pages/products/Products";
import ProductDetail from "./components/ProductDetail";
import DesignUpload from "./components/DesignUpload";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
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
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route
                    path="/profile"
                    element={<Navigate to="/profile/details" />}
                  />
                  <Route path="/orders" element={<h1>My Orders</h1>} />
                  <Route
                    path="/shared-orders"
                    element={<h1>Shared Orders</h1>}
                  />
                  <Route path="/my-designs" element={<h1>My Designs</h1>} />
                  <Route path="/address-book" element={<h1>Address Book</h1>} />
                  <Route
                    path="/payment-methods"
                    element={<h1>Payment Methods</h1>}
                  />
                  <Route
                    path="/email-notifications"
                    element={<h1>Email Notifications</h1>}
                  />
                  <Route
                    path="/profile-password"
                    element={<h1>Profile & Password</h1>}
                  />
                  <Route path="/design-upload" element={<DesignUpload />} />
                </Route>
              </Routes>
            </Router>
          </div>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
