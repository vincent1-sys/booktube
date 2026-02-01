import React from 'react';
import './About.css';

function About() {
  return (
    <div className="page about-page">
      <h2>À propos de BookTube</h2>

      <p>
        BookTube est une plateforme qui permet de publier, découvrir et partager des livres en ligne.
        Vous pouvez consulter les suggestions, vous abonner à vos auteurs préférés et gérer vos propres livres.
      </p>

      <h3>Important :</h3>
      <p>
        BookTube <strong>n’a aucun lien avec YouTube ni Google</strong>. Le mot “Tube” a simplement été choisi car nous adorons ce mot.
      </p>

      <h3>Développeur :</h3>
      <p>
        Cette application a été développée par la société <strong>VisionX</strong>.
      </p>

      <h3>Contact :</h3>
      <p>
        Pour tout contact, veuillez écrire via WhatsApp : <strong>+243 994826186</strong>
      </p>

      <h3>Fonctionnalités principales :</h3>
      <ul>
        <li>Publier des livres avec miniature</li>
        <li>Voir des suggestions de livres sur la page d’accueil</li>
        <li>S’abonner aux auteurs</li>
        <li>Gérer votre bibliothèque (livres publiés et brouillons)</li>
        <li>Like, commentaire, partage et téléchargement</li>
      </ul>

      <h3>Version :</h3>
      <p>v1.0 - Dernière mise à jour : janvier 2026</p>
    </div>
  );
}

export default About;
