import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      setLoginStatus(alert('Login Sukses'));
      navigate('/kucing');
    } else {
      setLoginStatus(alert('Username atau Password Salah'));
    }
  };

  const handleCreateAccount = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
            type="text"
            placeholder="Username"
            aria-label="name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
            type="password"
            placeholder="Password"
            aria-label="pass"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex justify-between items-center">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded" type="submit">
              Login
            </button>
            <div className="text-gray-500">
              <p>don't have account?</p>
            </div>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
