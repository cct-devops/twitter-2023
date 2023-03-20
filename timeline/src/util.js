import jwt from 'jsonwebtoken';


export function isTokenValid(tokenHeader) {
    if (!tokenHeader) { return false };
    const token = tokenHeader.split(' ')[1];
    if (!token) { return false };
    // validate the token: time and all that jazz.
    try {
        // TODO David: Next class, verify that this works.
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch(e) {
        return false;
    }
}