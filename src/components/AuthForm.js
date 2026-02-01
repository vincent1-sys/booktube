import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

function AuthForm({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/login', { email, password });
        onLogin(res.data.user);
      } else {
        await axios.post('http://localhost:5000/register', { full_name: fullName, email, password });
        alert('Compte créé avec succès ! Connectez-vous maintenant.');
        setIsLogin(true);
      }
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur serveur');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-tabs">
        <button type="button" className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Connexion</button>
        <button type="button" className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Créer un compte</button>
      </div>

      {!isLogin && <input type="text" placeholder="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)} required />}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">{isLogin ? 'Se connecter' : 'Créer un compte'}</button>
    </form>
  );
}

export default AuthForm;
