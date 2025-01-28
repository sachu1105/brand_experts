import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home"

const App = () => {
  return (
    <div className="overflow-hidden">
     <Router>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        </Routes>
      </Router>

      
      
    </div>
  )
}

export default App