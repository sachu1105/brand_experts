import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/LayOut";
import Home from "./pages/home/Home";
import Templates from "./pages/betemplates/Templates";

const App = () => {
  return (
    <div className="overflow-hidden">
     <Router>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
        </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;