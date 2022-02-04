import SearchCountry from "./components/SearchCountry";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayCountryInfo from "./components/DisplayCountryInfo";

const App = () => {
  return (<>
    <Router>
      <Routes>
        <Route path="/" element={<SearchCountry />} />
        <Route path="/country-info" element={<DisplayCountryInfo />} />
      </Routes>
    </Router>
  </>);
};

export default App;
