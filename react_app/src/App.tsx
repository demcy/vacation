import './App.css'
import {Link} from "react-router-dom";

function App() {

  return (
    <>
      <div className="my-auto mx-auto">
        <h1 className="display-1 text-light my-5">Do you want to go on vacation?</h1>
        <div id="auth-panel" className="d-flex justify-content-around text-light text-bg-success display-6 my-5 rounded">
            <Link to={'/login'}>
              Login
            </Link>
          <Link to={'/register'}>
            Register
          </Link>
        </div>
      </div>
    </>
  )
}

export default App
