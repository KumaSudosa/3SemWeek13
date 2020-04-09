import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "./App.css";

function App({ bookFacade }) {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={bookFacade} />
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={bookFacade} />
        </Route>
        <Route path="/find-book">
          <FindBook bookFacade={bookFacade} />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/no-match">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Header() {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/products">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/add-book">
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/find-book">
          Find Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/company">
          Company
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/no-match">
          No Match
        </NavLink>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Details({ bookFacade }) {
  const { bookId } = useParams();
  const findBook = bookFacade.findBook(bookId);

  return (
    <p>
      <b>ID:</b> {findBook.id}
      <br />
      <b>Title:</b> {findBook.title}
      <br />
      <b>Info:</b> {findBook.info}
    </p>
  );
}

function Products({ bookFacade }) {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Books</h2>
      <p>Total amount of books: {bookFacade.getBooks().length}</p>

      <ul>
        {bookFacade.getBooks().map((book) => {
          return (
            <li key={book.id}>
              {book.title}
              {book.title},{" "}
              <NavLink exact activeClassName="active" to={`${url}/${book.id}`}>
                details
              </NavLink>
            </li>
          );
        })}
      </ul>
      <br />

      <Switch>
        <Route exact path={path}>
          <h3>Select a Book</h3>
        </Route>
        <Route path={`${path}/:bookId`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>
    </div>
  );
}

function FindBook({ bookFacade }) {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(null);

  const findBook = () => {
    const foundBook = bookFacade.findBook(bookId);
    setBook(foundBook);
  };

  const deleteBook = (id) => {
    bookFacade.deleteBook(id);
    setBook(null);
  };

  return (
    <div>
      <h2>Find Book</h2>

      <input
        id="book-id"
        placeholder="Enter Book ID"
        onChange={(event) => {
          setBookId(event.target.value);
        }}
      />
      <button onClick={findBook}>Find Book</button>

      {book && (
        <div>
          <p>Title: {book.title}</p>
          <p>ID: {book.id}</p>
          <p>Info: {book.info}</p>
          <div>
            <button onClick={() => deleteBook(book.id)}>Delete Book</button>
          </div>
        </div>
      )}
      {!book && <p>Enter book-Id to See</p>}
    </div>
  );
}

function AddBook({ bookFacade }) {
  const emptyBook = { id: "", title: "", info: "" };
  const [book, setBook] = useState({ ...emptyBook });

  const handleChange = (event) => {
    const textInputID = event.target.id;
    const valueInput = event.target.value;
    setBook({ ...book, [textInputID]: valueInput });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    bookFacade.addBook(book);
    setBook({ ...emptyBook });
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form>
        <input
          id="title"
          value={book.title}
          placeholder="Add Title"
          onChange={handleChange}
        />

        <br />
        <input
          id="info"
          value={book.info}
          placeholder="Add Info"
          onChange={handleChange}
        />
        <br />
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}

function Company() {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>No Match</h2>
    </div>
  );
}

export default App;
