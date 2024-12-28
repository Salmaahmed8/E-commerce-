import crypto from "node:crypto";

const hashToken = (token) => {
    //hash token using sha521
    return crypto.createHash("sha512").update(token.toString()).digest("hex");
}

export default hashToken;