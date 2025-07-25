export const isProd = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  sameSite: "None", 
  secure: true,
  domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
  maxAge: 1000 * 60 * 60 * 24,
};
