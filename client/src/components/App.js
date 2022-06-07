import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import NavBar from './Pages/Header/NavBar';
import GlobalStyles from './GlobalStyles';
import AddQuestion from './Organizer/Questions/AddQuestion';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/organizer/questions/add" element={<AddQuestion />} />
        {/* <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/dashboard" element={<Dashboard />}>
            <Route exact path="bookmark-list" element={<BookmarkList />} />
            <Route exact path="profile" element={<MyProfile />} />
            <Route exact path="my-suggestions" element={<MySuggestions />} />
            <Route exact path="new-suggestions" element={<NewSuggestion />} />
          </Route>
          <Route exact path="/business-info">
            <Route exact path=":id" element={<BusinessInfo />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/not-found" element={<Err404 />} />
          <Route exact path="/*" element={<Err404 />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
