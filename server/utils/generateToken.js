import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET?.trim();

const generateTokenAndSetCookie = (userid, res) => {
    try {
        const token = jwt.sign({ userid }, "JWT_SECRET", { 
    expiresIn: "15d" 
});
// console.log("Generated Token:", token);

res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    secure: false,  // Localhost pe `false` rakho
    sameSite: "Lax",  // "None" ko "Lax" me change karo
});

    } catch (err) {
        console.error("JWT Error:", err);

        console.error(err);
    }
}

export default generateTokenAndSetCookie;
