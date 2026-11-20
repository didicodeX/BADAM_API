# BADAM API

API Express + MongoDB + Socket.IO du projet BADAM.

## Développement local

```bash
cp .env.example .env   # puis remplir les valeurs
npm install
npm run dev
```

`index.js` crée le serveur HTTP, branche Socket.IO et l'exporte. Il appelle `server.listen` sauf sur Vercel (`VERCEL` défini), où le serveur exporté est servi par une Vercel Function.

## Déploiement sur Vercel (recommandé, gratuit, pas de mise en veille)

1. Vercel → **Add New Project** → importer `didicodeX/BADAM_API` (Framework : Express, détecté automatiquement).
2. Ajouter les variables de `.env.example` (sauf `PORT`), avec `NODE_ENV=production` et `COOKIE_DOMAIN=.badam.app`.
3. Déployer et vérifier que `GET /` répond `Hello` sur l'URL `*.vercel.app`.
4. Ajouter le domaine `api.badam.app` au projet. Le DNS de `badam.app` est déjà chez Vercel : remplacer le CNAME `api` (qui pointe vers Railway) par l'enregistrement proposé par Vercel.

Le temps réel passe par les WebSockets des Vercel Functions. Le front force le transport `websocket` (pas de long-polling, qui demanderait des sessions persistantes). Une connexion est coupée quand la fonction atteint sa durée max ; le client Socket.IO se reconnecte tout seul.

Limite connue : si Vercel lance plusieurs instances en parallèle, un événement émis par une instance n'atteint pas les sockets ouvertes sur une autre. Pour un trafic faible c'est rare ; sinon, ajouter un adaptateur Socket.IO partagé (par ex. `@socket.io/mongo-adapter` sur la base existante).

## Alternative : Render (gratuit, avec mise en veille)

`render.yaml` décrit le service. Render → **New → Blueprint** → choisir ce dépôt, remplir les variables, puis pointer `api.badam.app` vers l'URL `*.onrender.com`. Le serveur tourne en continu donc Socket.IO marche sans limite, mais il s'endort après 15 min sans trafic (premier appel ~30 à 60 s).
