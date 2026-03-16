import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface JwtPayload {
    id: number;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization;

    console.log("Auth header:", authHeader);
    console.log("JWT_CODE:", process.env.JWT_CODE ? "exists" : "NOT FOUND");

    if (!authHeader) {
        return res.status(401).json({
            message: "Token required",
        });
    }

    const parts = authHeader.split(" ");
    const token = parts[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid token format"
        })
    }

    try {

        const secret = process.env.JWT_CODE;
        if (!secret) {
            console.error("JWT_CODE not found in environment variables");
            return res.status(500).json({
                message: "Server configuration error",
            });
        }

        const decoded = jwt.verify(
            token,
            secret
        ) as JwtPayload;

        console.log("Decoded token:", decoded);

        req.user = {
            id: decoded.id
        };

        console.log("User set in request:", req.user);

        return next();

    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({
            message: "Invalid token",
        });

    }
}
