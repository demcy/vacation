import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

async function App() {
    const [count, setCount] = useState(0)

    try {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
        const response = await fetch('http://localhost:9000/vacation_requests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/ld+json',
                'Cookie': 'PHPSESSID=f118r700l482dddfike232n3m5'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('error');
        }

        const data = await response.json();
        console.log(data);
        //const token = data.token;
        //localStorage.setItem('token', token);

        console.log('Login successful');
    } catch (err) {

    } finally {

    }

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
