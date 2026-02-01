import React, { useState } from 'react';
import Header from './components/Header';
import FooterNav from './components/FooterNav';
import UploadModal from './components/UploadModal';
import AuthForm from './components/AuthForm';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [showUpload, setShowUpload] = useState(false);
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // <-- état pour la recherche
  
const [books, setBooks] = useState([
  {
    id: 1,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    cover: 'https://picsum.photos/200/250?1',
    views: 1200,
    likes: 230,
    comments: 15,
    commentsList: [
      { user: "Utilisateur1", text: "J'adore ce livre !" },
      { user: "Utilisateur2", text: "Très intéressant." }
    ],
  },
  {
    id: 2,
    title: 'La programmation',
    author: 'Antoine de Saint-Exupéry',
    cover: 'https://picsum.photos/200/250?1',
    views: 1200,
    likes: 230,
    comments: 15,
    status: "draft",
    commentsList: [
      { user: "Utilisateur1", text: "J'adore ce livre !" },
      { user: "Utilisateur2", text: "Très intéressant." }
    ],
  },
]);

  /* ===== ACTIONS ===== */
  const [likedBooks, setLikedBooks] = useState ([])
  const handleLike = (id) => {
  // Si le livre n'a pas encore été liké par l'utilisateur
  if (!likedBooks.includes(id)) {
    // Ajouter 1 like au livre correspondant
    setBooks(
      books.map(b =>
        b.id === id ? { ...b, likes: b.likes + 1 } : b
      )
    );
    // Ajouter ce livre à la liste des livres déjà likés
    setLikedBooks([...likedBooks, id]);
  } else {
    // Si l'utilisateur a déjà liké ce livre
    alert("Vous avez déjà aimé ce livre !");
  }
};


  const handleSubscribe = (author) => {
    if (!subscriptions.includes(author)) {
      setSubscriptions([...subscriptions, author]);
      alert(`Vous êtes abonné à ${author}`);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage('home'); // retourne automatiquement à l'accueil pour afficher les résultats
  };

  /* ===== FILTRE DES LIVRES POUR L'ACCUEIL ===== */
  const filteredBooks = books.filter(
    (b) =>
      b.status === 'published' &&
      (b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
       b.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="App">
      <Header onAbout={() => alert('BookTube une bibliotheque des livres en ligne et développé par VisionX,il ne pas lié à youtube ni à google.\nContact WhatsApp: +243 994826186')} onSearch={handleSearch} />

      {/* ===== ACCUEIL ===== */}
      {page === 'home' && (
        <div className="page">
          <h2>Suggestions de livres</h2>
          <div className="book-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <img src={book.cover} alt={book.title} />
                  <h4>{book.title}</h4>

                  <div className="author">
                    <span>{book.author}</span>
                    <button
                      className="subscribe-btn"
                      onClick={() => handleSubscribe(book.author)}
                    >
                      S’abonner
                    </button>
                  </div>

                  <div className="tags">
                    {book.tags.map((t,i)=>(
                      <span key={i} className="tag">#{t}</span>
                    ))}
                  </div>

                  <div className="actions">
                    <button onClick={() => handleLike(book.id)}>👍 {book.likes}</button>
                    <button>💬 {book.comments}</button>
                    <button>📤partager</button>
                    <button>⬇️telecharger</button>
                  </div>
                  <div className="comments-section">
  {book.commentsList && book.commentsList.length > 0 ? (
    <ul>
      {book.commentsList.map((c, i) => (
        <li key={i} className="comment">
          <div className="avatar">👤</div>
          <div className="comment-text">
            <strong>{c.user}</strong>
            <p>{c.text}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>Aucun commentaire pour l’instant.</p>
  )}
</div>
                  <small>👁️ {book.views} vues</small>
                </div>
              ))
            ) : (
              <p>Aucun livre trouvé pour "{searchQuery}"</p>
            )}
          </div>
        </div>
      )}

      {/* ===== LES AUTRES PAGES ===== */}
      {page === 'subscriptions' && (
        <div className="page">
          <h2>Abonnements</h2>
          {subscriptions.length === 0 ? (
            <p>Vous n’êtes abonné à personne.</p>
          ) : (
            <ul className="subscription-list">
              {subscriptions.map((a, i) => (
                <li key={i}>👤 {a}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {page === 'library' && (
        <div className="page">
          <h2>Bibliothèque</h2>
          <h3>Livres publiés</h3>
          <div className="book-grid">
            {books.filter((b) => b.status==='published').map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.cover} alt={book.title}/>
                <h4>{book.title}</h4>
                <small>👁️ {book.views} vues</small>
              </div>
            ))}
          </div>

          <h3>Brouillons</h3>
          <div className="book-grid">
            {books.filter((b) => b.status==='draft').map((book)=>(
              <div key={book.id} className="book-card draft">
                <img src={book.cover} alt={book.title}/>
                <h4>{book.title}</h4>
                <small>📝 Brouillon</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === 'account' && (
        <div className="page">
          <h2>Votre compte</h2>
          {!user ? (
            <AuthForm onLogin={(userData) => setUser(userData)} />
          ) : (
            <div className="account-box">
              <p>👤 {user.fullName ? user.fullName : user.email}</p>
              <button className="account-btn" onClick={() => setUser(null)}>
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      )}

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}

      <FooterNav
        onHome={() => setPage('home')}
        onSubscriptions={() => setPage('subscriptions')}
        onAccount={() => setPage('account')}
        onUpload={() => setShowUpload(true)}
        onLibrary={() => setPage('library')}
      />
    </div>
  );
}

export default App;
