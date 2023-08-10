import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import Alltasks from "./pages/Alltasks"
import Ongoing from "./pages/Ongoing"
import Update from "./pages/Update";
import Create from "./pages/Create";
import Complete from "./pages/Complete";
// import Error from "./pages/Error";






function App() {
  return (
    <>
   <Router>

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/all" element={<Alltasks />} />
      <Route path="/ongoing" element={<Ongoing />} />
      <Route path="/completed" element={<Complete />} />
      <Route path="/create" element={<Create />} />
      <Route path="/update/:taskId" element={<Update />} />
      <Route path="/*" element={<Error />} />
    </Routes>

   </Router>
    
    </>
  );
};


export default App;