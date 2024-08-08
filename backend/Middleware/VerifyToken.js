import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) return res.status(401).json({ msg: "No authentication token, authorization denied" });
        const token = authHeader.split(" ")[1]; 
        if (!token) return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        req.user = verified.id;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
