type EnvironmentVariables = {
  url: string;
};

export const env: EnvironmentVariables = {
  url: process.env.REACT_APP_API_URL as string,
};
