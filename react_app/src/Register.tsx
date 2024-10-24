import { useState } from 'react'

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы
        setLoading(true);

        try {
            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setError(null);
            setSuccess(true)
            console.log('Register successful');

        } catch (err) {
            console.log(err)
            setSuccess(false)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-auto w-75 mx-auto">
            <h2 className="text-light display-3">Register</h2>
            {error && <p className="text-bg-danger" style={{ color: 'red' }}>{error}</p>}
            {success && <a className="text-bg-success fs-1" href="http://localhost:9004">Follow this link to confirm your email</a>}
            <form onSubmit={handleRegister}>

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
                    {loading ? 'Registering ...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
