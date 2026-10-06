# Ma Base : refonte Scrollcraft et vérification

Version de départ : Hermes `20a2fe7`. Les 12 parcours, les 37 leçons et l’anonymisation sont conservés à l’identique.

## Design et comportement

- Accueil avec reprise de la leçon et carte des 12 parcours liée à la progression réelle.
- Pages de parcours avec composition 3D, couleurs propres au sujet, lecture restante calculée et liste de leçons.
- Lecture aérée avec rail d’étapes, navigation clavier et exemples de code complets.
- Reformulations avec aperçu réel des textes, état vide et accès direct à l’édition.
- Recherche, historique et liens directs, sauvegarde locale compatible et export/import JSON.
- Animations réduites selon la préférence système. Nettoyage de ScrollCraft lors de chaque changement de vue.

Skill appliqué : Scrollcraft fusion v4, installé dans le skill principal Hermes ; base GitHub 0.3.1 (`75d81f74e83692add18cd7a8a8e078b8a887a579`) et personnalisations utilisateur. Le moteur embarqué conserve le code officiel et sa licence. Grammaire Live surface adaptée à l’apprentissage. Aucun média généré ni contenu de cours inventé.

## Tests fonctionnels

`npm ci && npm test` : les 37 leçons et toutes les lignes des exemples sont vérifiées. Le contenu est comparé à la référence Hermes. Les tests couvrent la compatibilité des anciennes notes, sauvegarde/rechargement, progression, recherche, imports invalides ou annulés, liens directs, navigation mobile, données locales corrompues, erreurs du tuteur et 40 changements de vue avec une seule instance ScrollCraft active.

## Tests dans Chromium

Exécutés sur GitHub Actions sur la version finale du HTML :

- Écrans 1440 × 1000, 390 × 844 et 320 × 740 ; session supplémentaire avec mouvement réduit.
- Accueil, parcours Code, leçon, milieu de lecture, saisie, reformulations, recherche et menu mobile.
- Aucun débordement horizontal du document dans les états capturés.
- Lien d’évitement et focus clavier, saisie puis rechargement, progression, retour du tuteur simulé.
- Téléchargement réel de l’export JSON puis restauration par sélection de fichier avec confirmation.
- Contrôle Axe des écrans accueil, leçon et notes aux quatre configurations ; ce contrôle automatique ne constitue pas une certification d’accessibilité.

Les captures ont été examinées. Deux défauts ont été corrigés : l’occultation de l’icône par un plan 3D, puis le manque d’accès clavier aux exemples de code défilants.

## Tuteur réellement installé

Le service local répond à `/health`. Une requête réelle à `/v1/chat/completions` a renvoyé une correction pertinente en français avec HTTP 200. Le prévol CORS et la réponse autorisent l’origine `https://dembis91-940.github.io`. Seul un exemple de test a été envoyé, aucune note personnelle.

La session navigateur sur GitHub utilise un tuteur simulé : elle n’accède pas au serveur du Mac. Une autorisation d’accès au réseau local peut encore dépendre du navigateur utilisé sur l’appareil.

## Limites

Pas de test sur téléphone physique ni sur Safari. Aucun test ne garantit l’absence de tout défaut. Les informations propres au diplôme TSRS doivent être confirmées avec le référentiel officiel de la formation.

Validation finale : [GitHub Actions — exécution réussie](https://github.com/Dembis91-940/mabase/actions/runs/37427168044), HTML testé au commit `b7d1057304b101acf9fd1fa55855d3afdb74d8dc`. Aucun signalement Axe sur les douze états contrôlés.

## Révision graphique Atelier — 6 octobre 2026
Version testée : `d7aa01f`, [exécution Chromium réussie](https://github.com/Dembis91-940/mabase/actions/runs/37467330388). Nouveau langage visuel graphite/papier/cuivre, Space Grotesk embarquée, carte orbitale, cartes de parcours et carnet clair. Les fonctions et les données de cours sont conservées.

Tests sur 1440 × 1000, 1024 × 900, 390 × 844, 320 × 740 et mouvement réduit : accueil, reprise, catalogue, parcours, lecture, notes, recherche, menu mobile, saisie/rechargement et export/import réels. Aucun débordement du document dans les états capturés ; aucune erreur JavaScript ; aucune violation Axe sur les quinze écrans analysés. Les captures finales ont été examinées, notamment le petit écran, le catalogue mobile, la tablette et la lecture.

Le débordement des plans décoratifs sur petit écran a été corrigé. Le test d’import attend la mise à jour effective du stockage après la confirmation, sans se contenter d’un texte déjà présent dans la page. Les limites précédentes restent applicables : navigateur Chromium, aucun téléphone physique ni Safari, tuteur simulé dans le navigateur de CI.
