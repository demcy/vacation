import { Route } from "react-router-dom";
import { List, Create, Update, Show } from "../components/vacation_request/";

const routes = [
  <Route path="/vacation_requests/create" element={<Create />} key="create" />,
  <Route path="/vacation_requests/edit/:id" element={<Update />} key="update" />,
  <Route path="/vacation_requests/show/:id" element={<Show />} key="show" />,
  <Route path="/vacation_requests" element={<List />} key="list" />,
  <Route path="/vacation_requests/:page" element={<List />} key="page" />,
];

export default routes;
