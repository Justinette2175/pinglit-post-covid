interface Config {
  BASE_URL?: string;
}

let config: Config = {};
if (process.env.NODE_ENV === "development") {
  config.BASE_URL = "localhost:3000";
} else if (process.env.NODE_ENV === "production") {
  config.BASE_URL = "https://pinglit-f193a.web.app/";
}
export default config;
