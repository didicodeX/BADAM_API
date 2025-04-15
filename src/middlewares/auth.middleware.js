import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.json({ message: "Acces refuse , token manquant" })
    }

    console.log("Access Token reçu :", token); // 🪵 LOG
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //ajouter les informations de l'utilisateur a la requete

        next(); //Passe a la fonction suivante
    } catch (err) {
        res.json({ message: "Token invalide", error: err.message });
    }
}
