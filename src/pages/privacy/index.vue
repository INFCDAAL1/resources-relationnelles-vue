<template>
  <h1>Politique de Confidentialité</h1>

  <section>
    <h2>1. Responsable du traitement</h2>
    <p>
      Le traitement des données est effectué par <strong>RR</strong>.<br />
      Pour toute question : <a href="mailto:contact@qalpuch.cc">contact@qalpuch.cc</a>
    </p>
  </section>

  <section>
    <h2>2. Données collectées</h2>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Données</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Compte utilisateur</td>
          <td>Nom, e-mail, mot de passe (haché), rôle, activation, validité, dates</td>
        </tr>
        <tr>
            <td>Ressources</td>
            <td>Titres, contenus, visibilité, menus liés, invitations</td>
        </tr>
        <tr>
            <td>Favoris</td>
            <td>Ressources favorites, date d'ajout</td>
        </tr>
        <tr>
            <td>Messagerie</td>
            <td>Expéditeur, destinataire, date, contenu, statut de lecture</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>3. Finalités</h2>
    <ul>
      <li>Gestion de compte et authentification</li>
      <li>Suivi des fichiers envoyés par tous les utilisateurs</li>
      <li>Accès à des contenus personnalisés</li>
      <li>Stocker des fichiers pour partage de ressources</li>
      <li>Amélioration continue de l'expérience utilisateur</li>
      <li>Statistiques d'utilisation de l'application à des fins d'améliorations</li>
    </ul>
  </section>

  <section>
    <h2>4. Sécurité</h2>
    <ul>
      <li>Connexion sécurisée (HTTPS)</li>
      <li>Stockage chiffré des mots de passe (bcrypt)</li>
      <li>Protection contre les injections SQL, XSS et autres attaques courantes</li>
    </ul>
  </section>

  <section>
    <h2>5. Droits des utilisateurs</h2>
    <p>
      Vous disposez des droits d'accès, de rectification, de suppression, de portabilité et d'opposition au traitement
      de vos données.<br />
      Pour exercer vos droits qui ne sont pas directement accessibles à travers l'application : <a href="mailto:contact@qalpuch.cc">contact@qalpuch.cc</a>
    </p>
  </section>

  <div class="footer">
    Dernière mise à jour : 10 juillet 2025
  </div>
</template>

<script setup>
// Composant statique
</script>

<style scoped>
body {
      font-family: Arial, sans-serif;
      background: #f8f9fa;
      color: #333;
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 960px;
      margin: auto;
      background: #fff;
      padding: 2rem;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1, h2 {
      color: #aab7d8;
    }
    h1 {
      margin-bottom: 1rem;
    }
    section {
      margin-bottom: 2rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.5rem;
    }
    table, th, td {
      border: 1px solid #ccc;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
    }
    ul {
      padding-left: 1.2rem;
    }
    .footer {
      text-align: right;
      font-size: 0.875rem;
      color: #666;
    }
</style>