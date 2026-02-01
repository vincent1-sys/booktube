import React, { useState } from 'react';
import './Header.css';

function Header({ onAbout, onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && query.trim() !== '') {
      onSearch(query.trim());
      setQuery('');
    }
  };
  const handleMonetizationClick = () => {
  alert("Page Monétisation : ici vous pourrez connecter AdSense et voir vos revenus, pour etre monétisé vous devez avoir 2000 abonnés et 5000 heures des visonnages, mais aussi vous pouvez fixé le prix sur vos livres");
};


  return (
    <header className="header">
      <h1 className="logo">BookTube</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <nav className="nav-menu">
        <button onClick={onAbout}>À propos</button>
        <button className="Monétization-btn"onClick={handleMonetizationClick}>Monétisation</button>
      </nav>
    </header>
  );
}

export default Header;
