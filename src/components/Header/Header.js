import Search from "../search/Search";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="title">Search for books</h1>
      <Search />
    </header>
  );
}

export default Header;
