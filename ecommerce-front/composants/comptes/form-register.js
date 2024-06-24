import React, { useState } from 'react';
import Link from "next/link";

const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('FirstName:', firstname);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <div className="register-form-group">
          <label htmlFor="firstname">Prénom:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          </div>
          <div className="register-form-group">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-btn btn-primary">S'inscrire</button>
      </form>
      <p className="register-login-link">
        Vous avez déjà un compte ? <Link href={"/login"}>Connectez-vous</Link>.
      </p>
    </div>
  );
};

export default RegisterForm;
