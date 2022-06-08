import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import NavBar from './Pages/Header/NavBar';
import GlobalStyles from './GlobalStyles';
import AddQuestion from './Organizer/Questions/AddQuestion';
import AddQuiz from './Organizer/Quizzes/AddQuiz';
const App = () => {
  return (
    <Router>
      <GlobalStyles />
      {/* <NavBar /> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/organizer/add-question" element={<AddQuestion />} />
        <Route path="/organizer/add-quiz" element={<AddQuiz />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
