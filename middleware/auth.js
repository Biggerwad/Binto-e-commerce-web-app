import jwt from "jsonwebtoken";

export const isVerified = async (req, res, next) => {
    const header = req.headers['authorization'];
    try {
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];

            const vToken = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = vToken;
            next();
        }
    } catch (err) {
        res.status(500).json(" ERR")
    }
};

export default isVerified;