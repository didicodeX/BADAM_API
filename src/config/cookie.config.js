export const isProd = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "None",
  domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
  maxAge: 1000 * 60 * 60 * 24,
};
