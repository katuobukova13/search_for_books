import Search from "./components/search/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./css/app.css";

function App() {
  return (
    <>
      <CssBaseline>
        <h1 className="title">Book Search</h1>
        <Search />
      </CssBaseline>
    </>
  );
}

export default App;
