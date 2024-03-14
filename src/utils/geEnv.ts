export const enum ENV_KEY {
  MONGODB_URL = "MONGODB_URL",
  NEXTAUTH_SECRET = "NEXTAUTH_SECRET",
  GOOGLE_CLIENT_ID = "GOOGLE_CLIENT_ID",
  GOOGLE_CLIENT_SECRET = "GOOGLE_CLIENT_SECRET",
  API_URL = "API_URL",
}

export const getEnvValue = (key: ENV_KEY): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};
