export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const cryptoConstants = {
  secret: process.env.CRYPTO_SECRET,
  salt: process.env.CRYPTO_SALT,
};
