import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Hsection1 from "../src/pages/home/Hsection1"
import Hsection2 from "./pages/home/Hsection2"
import Hsection3 from "./pages/home/Hsection3"
import Hsection7 from "./pages/home/Hsection7"
import Hsection5 from "./pages/home/Hsection5"
import Hsection6 from "./pages/home/Hsection6"
import Hsection4 from "./pages/home/Hsection4"

const App = () => {
  return (
    <div>
     
      <Navbar />
      <Hsection1 />
      <Hsection2 />
      <Hsection3 />
      <Hsection4 />
      <Hsection5 />
      <Hsection6 />
      <Hsection7 />
      <Footer />
      
      
    </div>
  )
}

export default App