import type{ Request, Response } from "express";
import { addressService } from "../../service/address/addressAdd.service.js";


export async function createAddressController(req: Request, res: Response) {
  try {

    const result = await addressService(req.body);

    if (result?.error) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {

    return res.status(500).json({
      error: true,
      message: "Internal server error"
    });

  }
}