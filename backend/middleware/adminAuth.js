const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not authorized, login again" });
        }

        // Decode the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Compare the email and password from token with env variables
        if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not authorized, login again" });
        }

        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

module.exports = adminAuth;
