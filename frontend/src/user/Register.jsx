import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate(); // deklarasi hook useNavigate
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username && password) {
      const response = await fetch('http://localhost:3000/api/checkUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
        }),
      });

      const data = await response.json();

      if (data.exists) {
        setRegistrationStatus('Username telah ada, silahkan memasukkan username yang baru');
      } else {
        const registerResponse = await fetch('http://localhost:3000/api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        if (registerResponse.ok) {
          setRegistrationStatus(alert('Sukses Registrasi!'));
          navigate('/login');
        } else {
          setRegistrationStatus(alert('Gagal Registrasi'));
        }
      }
    } else {
      setRegistrationStatus('Isi Username dan Password');
    }
  };

  const handleLogin = () => {
    navigate('/login'); // menggunakan fungsi navigate untuk pindah ke halaman Login
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
            type="text"
            placeholder="Username"
            aria-label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
            type="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center mb-4">
            <button
              disabled={!username || !password}
              className="bg-indigo-500 text-white px-4 py-2 rounded w-full focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
          {registrationStatus && <div className="text-red-500">{registrationStatus}</div>}
        </form>
        <div className="text-center font-mono">
          <p className="text-gray-500">Already have an account? </p>
          <button className="text-blue-900 font-mono" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
