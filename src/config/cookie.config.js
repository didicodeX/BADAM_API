export const isProd = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  sameSite: isProd ? "None" : "Lax", // ✅ Lax en dev (accepte sur même site)
  secure: isProd,
  domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
  maxAge: 1000 * 60 * 60 * 24,
};
