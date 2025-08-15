import jwt from "jsonwebtoken";

const validUser = (req, res, next) => {

    const token = req.headers.cookie.split("token=")[1];
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("decoded", decoded);

    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
}

export default validUser
