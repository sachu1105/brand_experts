import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext.jsx"; // Update extension
import { ModalProvider } from "./context/ModalContext";
import Layout from "./components/LayOut";
import Home from "./pages/home/Home";
import Templates from "./pages/betemplates/Templates";
import Cart from "./components/Cart";
import Register from "./pages/loginSignin/Register";
import Login from "./pages/loginSignin/Login";
import Warranty from "./pages/warranty/Warranty";
import Products from "./pages/products/Products";
import ProductDetail from "./components/ProductDetail";
import DesignUpload from "./components/DesignUpload";
import WarrantyClaim from "./pages/warranty/WarrantyClaim";
import CategoryPage from "./pages/CategoryPage"; // You'll need to create this
import { ErrorBoundary } from "./components/ErrorBoundary";
import AuthModal from "./components/AuthModal";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/Orders";
import PaymentSuccess from "./pages/checkout/PaymentSuccess";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./utils/stripe";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <ModalProvider>
            <ErrorBoundary>
              <Router>
                <div className="overflow-hidden">
                  <Elements stripe={stripePromise}>
                    <Routes>
                      <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/templates" element={<Templates />} />
                        <Route path="/warranty" element={<Warranty />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                          path="/product/:id"
                          element={<ProductDetail />}
                        />
                        <Route
                          path="/profile"
                          element={<Navigate to="/profile/details" />}
                        />
                        <Route
                          path="/orders"
                          element={
                            <ProtectedRoute>
                              <Orders />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/shared-orders"
                          element={<h1>Shared Orders</h1>}
                        />
                        <Route
                          path="/my-designs"
                          element={<h1>My Designs</h1>}
                        />
                        <Route
                          path="/address-book"
                          element={<h1>Address Book</h1>}
                        />
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
                        <Route
                          path="/design-upload"
                          element={<DesignUpload />}
                        />
                        <Route
                          path="/warranty-claim/:warrantyNumber"
                          element={<WarrantyClaim />}
                        />
                        <Route
                          path="/category/:categoryId"
                          element={<CategoryPage />}
                        />
                        <Route
                          path="/checkout"
                          element={
                            <ProtectedRoute>
                              <Checkout />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/payment-success"
                          element={
                            <ProtectedRoute>
                              <PaymentSuccess />
                            </ProtectedRoute>
                          }
                        />
                      </Route>
                    </Routes>
                    <AuthModal />
                  </Elements>
                </div>
              </Router>
            </ErrorBoundary>
          </ModalProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
