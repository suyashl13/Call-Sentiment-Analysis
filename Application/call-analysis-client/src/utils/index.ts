import { JWTVerifyResult, jwtVerify } from "jose";

export async function validateToken(
  jsonWebToken: string
): Promise<JWTVerifyResult> {
  const encodedSecretKey: Uint8Array = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET as string
  );
  const jwtVerified: JWTVerifyResult = await jwtVerify(
    jsonWebToken,
    encodedSecretKey,
    {}
  );

  return jwtVerified;
}