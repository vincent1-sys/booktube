import React, { useState } from 'react';
import './UploadModal.css';

function UploadModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('CDF'); // Valeur par défaut
  const [pdfFile, setPdfFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const tagSuggestions = [
    'informatique','programmation','droit','finance','motivation',
    'éducation','roman','business','IA','développement personnel'
  ];

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if(file) setPdfFile(file);
  };

  const addTag = (tag) => {
    if(!tags.includes(tag)) setTags([...tags, tag]);
    setTagInput('');
  };

  const removeTag = (tag) => setTags(tags.filter(t=>t!==tag));

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!pdfFile || !coverFile){
      alert('Veuillez ajouter le livre ET sa couverture');
      return;
    }
    alert(`Livre publié avec succès ✅\nPrix: ${isPaid ? price + ' ' + currency : 'Gratuit'}`);
    onClose();
  };

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>Publier un livre</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <form className="upload-content" onSubmit={handleSubmit}>
          <div className="upload-row">
            <div className="cover-section">
              {coverPreview ? (
                <img src={coverPreview} alt="Couverture" />
              ) : (
                <div className="cover-placeholder">Aperçu de la couverture</div>
              )}
            </div>

            <div className="pdf-section">
              <label className="file-label">
                Importer le livre (PDF)
                <input type="file" accept="application/pdf" onChange={handlePdfChange} required />
              </label>

              <label className="file-label">
                Ajouter/Modifier la couverture
                <input type="file" accept="image/*" onChange={handleCoverChange} required />
              </label>
            </div>
          </div>

          {/* Champs texte */}
          <input type="text" placeholder="Titre du livre" value={title} onChange={e=>setTitle(e.target.value)} required />
          <input type="text" placeholder="Auteur" value={author} onChange={e=>setAuthor(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required />
          <input type="text" placeholder="Domaine" value={domain} onChange={e=>setDomain(e.target.value)} required />

          {/* Tags */}
          <div className="tags-section">
            <input
              type="text"
              placeholder="Ajouter des tags"
              value={tagInput}
              onChange={e=>setTagInput(e.target.value)}
              onKeyDown={e=>{
                if(e.key==='Enter'){ e.preventDefault(); if(tagInput.trim()!=='') addTag(tagInput.trim()); }
              }}
            />
            <div className="tag-list">
              {tags.map((t,i)=>(
                <span key={i} className="tag">#{t} <button type="button" onClick={()=>removeTag(t)}>✖</button></span>
              ))}
            </div>
            <div className="tag-suggestions">
              {tagSuggestions.filter(t=>t.includes(tagInput.toLowerCase()) && !tags.includes(t))
                .map((t,i)=><span key={i} onClick={()=>addTag(t)}>#{t}</span>)}
            </div>
          </div>

          {/* Gratuit / payant */}
          <div className="row">
            <label>
              <input type="checkbox" checked={isPaid} onChange={()=>setIsPaid(!isPaid)} /> Livre payant
            </label>
          </div>
          {isPaid && (
            <div className="row">
              <input type="number" placeholder="Prix" value={price} onChange={e=>setPrice(e.target.value)} required />
              <select value={currency} onChange={e=>setCurrency(e.target.value)}>
                <option value="CDF">CDF</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option> {/* AJOUT EURO */}
              </select>
            </div>
          )}

          <button type="submit" className="publish-btn">Publier</button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
