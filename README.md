# Ma Base

Application personnelle d’apprentissage : 37 leçons et 12 parcours. Un seul fichier HTML, utilisable hors ligne sans installation. La version en ligne utilise GitHub Pages.

## Utiliser

Ouvrir `index.html` dans un navigateur. Retrouver la dernière leçon depuis l’accueil, explorer les parcours ou utiliser la recherche. Dans une leçon, le rail d’étapes permet de naviguer entre les explications et la reformulation. « Compris » reste un statut déclaré par l’utilisateur, pas une certification automatique.

La progression et les notes utilisent la clé historique `mabase-progress-v1`. Les données restent dans le navigateur. Exporter une sauvegarde JSON pour les transférer vers un autre appareil, navigateur ou vers la version locale. L’import demande confirmation avant de remplacer les éléments correspondants ; il conserve les autres. Les données locales illisibles ne sont pas écrasées silencieusement.

## Tuteur local

La correction envoie la leçon et la reformulation à `http://127.0.0.1:8080/v1/chat/completions` uniquement après un clic. Le serveur local doit exposer une API compatible OpenAI et permettre la connexion depuis la page. Les réglages CORS et les protections du navigateur peuvent bloquer cette connexion. Aucun service cloud n’est configuré. Le délai maximal est de 60 secondes et un changement de vue annule la requête. L’application fonctionne sans tuteur.

## Design et dépendances

Identité sombre, couleurs par parcours, accueil dimensionnel Scrollcraft, lecture aérée et parcours clavier. La préférence système de mouvement réduit est respectée. Le runtime ScrollCraft est embarqué dans le HTML ; sa licence et sa provenance sont dans `THIRD_PARTY_NOTICES.md`. Le skill appliqué est celui de l’installation Hermes de l’utilisateur. Le runtime officiel récent dispose du nettoyage requis lors des changements de vue.

Les dépendances npm servent uniquement aux tests, pas à l’application.

```sh
npm ci
npm test
```

Les tests utilisent un DOM simulé. Ils vérifient les 37 leçons, la conservation du contenu Hermes, toutes les lignes de code, les anciennes notes, les imports, la navigation, les erreurs de stockage et du tuteur, et le nettoyage du runtime après 40 changements de vue.

## État de vérification

Voir `VERIFICATION.md` pour les résultats et limites. La vérification Chromium a réussi sur ordinateur, deux formats mobiles et en mouvement réduit ; les captures ont été examinées. Le modèle local répond à une requête réelle et son CORS autorise le site. Le test navigateur utilise un tuteur simulé ; aucun téléphone physique ni Safari n’a été testé. Les informations propres au diplôme nécessitent une confirmation avec le référentiel officiel de la formation.
