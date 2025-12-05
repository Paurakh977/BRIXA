'use client';

import { useState } from 'react';

const API_URL = 'http://localhost:8000';

export default function AuthTestPage() {
  const [token, setToken] = useState(null);
  const [output, setOutput] = useState('Waiting for action...');
  const [isError, setIsError] = useState(false);

  const [regForm, setRegForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const log = (data, error = false) => {
    setIsError(error);
    setOutput(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm),
      });
      const data = await res.json();
      log(data, !res.ok);
    } catch (err) {
      log(err.message, true);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
        credentials: 'include',
      });

      const data = await res.json();
      
      if (!res.ok) {
        log(data, true);
        return;
      }

      setToken(data.access_token);
      log('Login Success! Token stored in memory.', false);
    } catch (err) {
      log(err.message, true);
    }
  };

  const getProfile = async () => {
    if (!token) return log('No Access Token! Login first.', true);

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      log(data, !res.ok);
    } catch (err) {
      log(err.message, true);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, { 
        method: 'POST',
        credentials: 'include'
      });
      setToken(null);
      log('Logged out successfully.', false);
    } catch (err) {
      log(err.message, true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          BRIXA Auth Test
        </h1>

        {/* REGISTER */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Register</h2>
          <input 
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name" 
            onChange={(e) => setRegForm({...regForm, firstName: e.target.value})} 
          />
          <input 
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name" 
            onChange={(e) => setRegForm({...regForm, lastName: e.target.value})} 
          />
          <input 
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email" 
            onChange={(e) => setRegForm({...regForm, email: e.target.value})} 
          />
          <input 
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password" 
            placeholder="Password" 
            onChange={(e) => setRegForm({...regForm, password: e.target.value})} 
          />
          <button 
            className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {/* LOGIN */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Login</h2>
          <input 
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email" 
            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} 
          />
          <input 
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password" 
            placeholder="Password" 
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
          />
          <button 
            className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {/* ACTIONS */}
        <div className="mb-6 space-y-2">
          <button 
            className="w-full py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition"
            onClick={getProfile}
          >
            Get My Profile
          </button>
          <button 
            className="w-full py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* OUTPUT */}
        <div className={`mt-6 p-4 rounded border text-sm font-mono ${
          isError 
            ? 'bg-red-50 border-red-300 text-red-900' 
            : 'bg-green-50 border-green-300 text-green-900'
        }`}>
          <pre className="whitespace-pre-wrap break-all">{output}</pre>
        </div>
      </div>
    </div>
  );
}