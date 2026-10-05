# Ma Base — comprendre, pas juste lire

Appli d'apprentissage personnelle (parcours TSRS · cyber/pentest · IA · automatisation · lire le code), en **un seul fichier HTML**.

## Lancer
- Double-clic sur `index.html` → s'ouvre dans le navigateur. Hors ligne, zéro serveur.
- Progression + reformulations sauvegardées localement (dans le navigateur).

## Tuteur IA « Corrige ma reformulation »
- Le bouton 🤖 fait corriger ta reformulation par un **modèle local** (llama.cpp + Qwen2.5-7B), en OpenAI-compatible sur `http://127.0.0.1:8080`.
- Démarrage du modèle (sur ton Mac) : `~/.hermes/local-ai/demarrer.sh`
- Tout reste **local** : rien n'est envoyé sur le cloud, aucune clé API.

> ⚠️ Cette version hébergée sur GitHub Pages ne contient **pas** le modèle : le bouton 🤖 fonctionne quand tu ouvres la page sur la machine où le modèle tourne (double-clic sur `index.html`).
