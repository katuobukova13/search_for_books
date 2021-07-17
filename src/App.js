import Search from "./components/search/Search";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
      </Container>
    </>
  );
}

export default App;
