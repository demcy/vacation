import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы
        setLoading(true);

        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const data = await response.json();
            setError(null);
            console.log('Login successful');
            // Navigate to /vacation_requests on successful login
            navigate('/vacation_requests');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-auto w-75 mx-auto">
            <h2 className="text-light display-3">Login</h2>
            {error && <p className="text-bg-danger" style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>

                <div className="form-group my-5">
                    <label className="text-light text-bg-info fs-4" htmlFor="inputEmail">Email:</label>
                    <input
                      id="inputEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control text-center"
                      placeholder="Email address"
                      required
                      autoFocus
                    />
                </div>
                <div className="form-group my-5">
                    <label className="text-light text-bg-info fs-4" htmlFor="inputPassword">Password:</label>
                    <input
                      id="inputPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control text-center"
                      placeholder="Password"
                      required
                    />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
