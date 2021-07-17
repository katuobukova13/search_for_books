import Search from "../search/Search";
import "../../css/app.css";

function Header() {
  return (
    <>
      <h1 className="title">Search for books</h1>
      <Search />
    </>
  );
}

export default Header;
