import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import GlobalStyles from './GlobalStyles';
import AddQuestion from './Panel/Questions/AddQuestion';
import AddQuiz from './Panel/Quizzes/AddQuiz';
import Quiz from './Panel/Quizzes/Quiz';
import Quizzes from './Panel/Quizzes';
import Organizer from './Panel';
import Settings from './Panel/Settings';
import Authorized from './Panel/Settings/Authorized';
import Leaderboard from './Panel/Leaderboard';
import Play from './Play';
import Join from './Panel/Quizzes/Join';
import Results from './Panel/Results';

const App = () => {


  return (
    <Router>
      <GlobalStyles />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/play/:joinCode" element={<Play />} />
        <Route path="/panel/authorized" element={<Authorized />} />
        <Route path="/panel/settings" element={<Settings />} />
        <Route exact path="/panel" element={<Organizer />} />
        <Route exact path="/panel/quizzes" element={<Quizzes />} />
        <Route exact path="/panel/results" element={<Results />} />
        <Route exact path="/panel/leaderboard/:joinCode" element={<Leaderboard />} />
        <Route exact path="/panel/quiz/join" element={<Join />} />
        <Route exact path="/panel/quiz/add" element={<AddQuiz />} />
        <Route exact path="/panel/question/add/quiz/:id" element={<AddQuestion />} />
        <Route path="/panel/quiz/:id/edit" element={<Quiz />} />

      </Routes>

    </Router>
  );
};

export default App;
