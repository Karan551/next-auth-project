import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export const generateToken = (request: NextRequest) => {
    const verifyToken = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(verifyToken, process.env.TOKEN_SECRET!);

    return decodedToken.id;
};
