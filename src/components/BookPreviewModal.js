import React from "react";
import "./BookPreviewModal.css";

const BookPreviewModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="preview-overlay">
      <div className="preview-modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <div className="preview-content">
          <img src={book.cover} alt={book.title} className="preview-cover" />
          <div className="preview-info">
            <h2>{book.title}</h2>
            <p><strong>Auteur:</strong> {book.author}</p>
            <p><strong>Vues:</strong> {book.views} | <strong>Likes:</strong> {book.likes} | <strong>Commentaires:</strong> {book.comments}</p>
            <p><strong>Description:</strong> {book.description || "Pas de description disponible."}</p>
            <button className="share-btn" onClick={() => alert(`Partager ${book.title}`)}>Partager</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewModal;
