import Search from "./components/search/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./css/app.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  return (
    <>
      <CssBaseline>
        <h1 className="title">Search for books</h1>
        <Search />
      </CssBaseline>
    </>
  );
}

export default App;
