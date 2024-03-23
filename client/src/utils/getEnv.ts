import getConfig from "next/config";

export enum ENV_KEY {
  MONGODB_URL = "MONGODB_URL",
  NEXTAUTH_SECRET = "NEXTAUTH_SECRET",
  GOOGLE_CLIENT_ID = "GOOGLE_CLIENT_ID",
  GOOGLE_CLIENT_SECRET = "GOOGLE_CLIENT_SECRET",
  ENGLISH_LEMMATIZER_URL = "ENGLISH_LEMMATIZER_URL",
  OPENAI_API_KEY = "OPENAI_API_KEY",
}

const isProduction = process.env.NODE_ENV === "production";

const getEnvValue = (key: ENV_KEY): string => {
  const env = isProduction ? getConfig().serverRuntimeConfig : process.env;
  const value = env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export { getEnvValue };
