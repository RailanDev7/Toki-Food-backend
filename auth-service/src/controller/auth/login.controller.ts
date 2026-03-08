import { loginService } from "../../service/auth/login.service.js";
import type { Request, Response } from "express";

export async function loginController(req: Request, res: Response) {
  try {

    const { email, password } = req.body;

    const result = await loginService(email, password);

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error("Controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}