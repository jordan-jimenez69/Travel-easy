import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        router.push('/');
        (window.confirm('Vous etes connecter'))
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erreur du serveur. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Connexion</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="register-link">
        Si vous n'avez pas de compte, <Link href={"/register"}>créez-en un</Link>.
      </p>
    </div>
  );
};

export default LoginForm;
