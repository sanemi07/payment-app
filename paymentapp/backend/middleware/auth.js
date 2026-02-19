import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

       

        if (!authorizationHeader) {
            return res.status(401).json({ error: "Auth header not found" });
        }

        let token;

        if (authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.split(" ")[1];
        } else {
            token = authorizationHeader; // handle raw token case
        }

        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

      

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({ error: error.message });
    }
};
