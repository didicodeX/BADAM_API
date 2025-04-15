export const authorize = (...allowRoles) =>{  
    return(req,res,next) =>{
        console.log("req.user dans authorize:", req.user); 
        const user = req.user;  
        if(!user|| !allowRoles.includes(user.role)){  
    return res.status(400).json({error:"Acces interdit."})
}
next();    
}
}

// export const authorize = (roles = []) => {
//     if (typeof roles === "string") {
//       roles = [roles];
//     }
  
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ message: "Accès interdit" });
//       }
//       next();
//     };
//   };
  