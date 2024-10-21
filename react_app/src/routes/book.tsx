import { Route } from "react-router-dom";
import { List, Create, Update, Show } from "../components/book/";

const routes = [
  <Route path="/admin/books/create" element={<Create />} key="create" />,
  <Route path="/admin/books/edit/:id" element={<Update />} key="update" />,
  <Route path="/admin/books/show/:id" element={<Show />} key="show" />,
  <Route path="/admin/books" element={<List />} key="list" />,
  <Route path="/admin/books/:page" element={<List />} key="page" />,
];

export default routes;
