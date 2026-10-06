# Ma Base : refonte Scrollcraft et vérification

Base revue : version Hermes `20a2fe7`. Les 12 parcours et 37 leçons sont conservés à l’identique, y compris l’anonymisation.

## Corrections

- Exemples de code : toutes les lignes sont affichées, au lieu de la première ligne de chaque groupe.
- Sauvegarde : validation des données chargées, gestion du stockage indisponible et conservation des données illisibles au lieu de les écraser.
- Navigation : liens directs, historique du navigateur, liens accessibles au clavier, fermeture du menu mobile et touche Échap.
- Import : validation, confirmation avant remplacement, rafraîchissement de la vue et possibilité de reprendre le même fichier.
- Tuteur : délai maximal, annulation à la navigation, réponse vide traitée comme erreur, affichage sûr du texte.
- Retour de l’accueil, de la reprise et de la liste des reformulations.

## Design

Identité sombre et couleurs par parcours conservées. Icônes vectorielles cohérentes, surfaces moins chargées, lecture à 16 px, largeur de texte maîtrisée, couches dimensionnelles à l’accueil et navigation des étapes au défilement. Mouvement réduit respecté. Les états compris et notes enregistrées restent des actions réelles.

Skill utilisé : version locale Hermes `skills/design/scrollcraft/SKILL.md` (fusion v3). Grammaire Live surface, adaptée à une application d’apprentissage selon son test d’audience. Brief rédigé à partir de l’application et des préférences du skill. Aucun média généré ni appel à une API de génération.

Runtime ScrollCraft officiel embarqué dans le HTML, avec sa fonction de démontage : elle évite d’accumuler les observateurs et boucles d’animation lors des changements de page. Moteur inchangé. Licence MIT embarquée.

## Résultats vérifiés

Tests automatisés réussis :

- 37 leçons rendues, toutes les lignes de chaque exemple présentes.
- Contenu pédagogique strictement identique à la version Hermes.
- Compatibilité des anciennes notes et sauvegarde/rechargement.
- Progression, recherche et filtres.
- Import valide, rejet invalide et annulation sans perte.
- Liens directs, page introuvable, reformulations et rail d’étapes.
- Menu mobile et Échap, navigation avec de vrais liens.
- Stockage indisponible et données corrompues conservées.
- Succès et erreurs du tuteur simulés ; texte de réponse non exécuté comme HTML.

## Limites restantes

Les captures et tests visuels de défilement sur ordinateur, mobile et mouvement réduit ne sont pas terminés : le lancement Chrome automatisé est bloqué et Computer Use attend les permissions macOS. Le fonctionnement du véritable modèle local n’a pas été testé ; ses réponses ont été simulées. Aucun appareil mobile physique testé.

Le contrôle fonctionnel automatique ne prouve pas l’absence de tout bug. Cette version attend la vérification visuelle avant publication. Les informations réglementaires ou propres au diplôme TSRS nécessitent le référentiel officiel.

## Fusion v4
Skill principal Hermes fusionné et installé avec GitHub 0.3.1 le 6 octobre 2026. L’accueil utilise maintenant une carte cliquable des 12 parcours. Le moteur de cet aperçu est lu depuis la fusion validée. Contrôle visuel toujours non réalisé ; il ne faut pas considérer les tests DOM comme une validation des pixels.
