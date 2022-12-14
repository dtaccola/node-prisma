import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryMan(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token required",
    });
  }

  // Bearer 465465465-54654654
  // [0] - Bearer
  // [1] - 465465465-54654654
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "202cb962ac59077b964b07152d234b70"
    ) as IPayload;

    request.id_deliveryman = sub;

    return next();

  } catch (err) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}