import { Container } from "@material-ui/core";
import Header from "./components/Header/Header";
import Books from "./components/books/Books";
import Book from "./components/book/Book";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/">
            <Books />
          </Route>
          <Route exact path="/:bookId">
            <Book />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
