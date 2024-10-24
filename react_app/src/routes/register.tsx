import { Route } from "react-router-dom";
import RegisterForm from "../Register.tsx";


const routes = [
  <Route path="/register" element={<RegisterForm />} key="show" />,
];

export default routes;
