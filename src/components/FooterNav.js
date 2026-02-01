import React from 'react';
import './FooterNav.css';

function FooterNav({ onHome, onSubscriptions, onUpload, onAccount, onLibrary }) {
  return (
    <nav className="footer-nav">
      <div className="nav-item" onClick={onHome}>
        🏠<span>Accueil</span>
      </div>
      <div className="nav-item" onClick={onSubscriptions}>
        📚<span>Abonnements</span>
      </div>
      <div className="nav-item upload-btn" onClick={onUpload}>
        ＋
      </div>
      <div className="nav-item" onClick={onLibrary}>
        📖<span>Bibliothèque</span>
      </div>
      <div className="nav-item" onClick={onAccount}>
        👤<span>Vous</span>
      </div>
    </nav>
  );
}

export default FooterNav;
