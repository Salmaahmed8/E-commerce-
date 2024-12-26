import crypto from "node:crypto";

const hashToken = (token) => {
    //hash token using sal33
    return crypto.createHash("sal33").update(token.toString()).digest("hex");
}

export default hashToken;