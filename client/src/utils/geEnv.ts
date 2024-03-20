import getConfig from "next/config";

export enum ENV_KEY {
  MONGODB_URL = "MONGODB_URL",
  NEXTAUTH_SECRET = "NEXTAUTH_SECRET",
  GOOGLE_CLIENT_ID = "GOOGLE_CLIENT_ID",
  GOOGLE_CLIENT_SECRET = "GOOGLE_CLIENT_SECRET",
  ENGLISH_LEMMATIZER_URL = "ENGLISH_LEMMATIZER_URL",
  OPENAI_API_KEY = "OPENAI_API_KEY",
}

export const getEnvValue = (key: ENV_KEY): string => {
  const { serverRuntimeConfig } = getConfig();
  const value = serverRuntimeConfig[key];
  if (!value) {
    console.error(`Environment variable ${key} is not defined`);
    return "";
  }
  return value;
};
