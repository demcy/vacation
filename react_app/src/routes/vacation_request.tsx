import { Route } from "react-router-dom";
import { List, Create, Update, Show } from "../components/book/";

const routes = [
  <Route path="/books/create" element={<Create />} key="create" />,
  <Route path="/books/edit/:id" element={<Update />} key="update" />,
  <Route path="/books/show/:id" element={<Show />} key="show" />,
  <Route path="/books" element={<List />} key="list" />,
  <Route path="/books/:page" element={<List />} key="page" />,
];

export default routes;
