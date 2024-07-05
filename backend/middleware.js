const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({});
    }

    const token = authHeader;
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(secret)
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({error : err});
    }
};

module.exports = {
    authMiddleware
}
