import { Route } from "react-router-dom";
import LoginForm from "../Login.tsx";


const routes = [
  <Route path="/login" element={<LoginForm />} key="show" />,
];

export default routes;
