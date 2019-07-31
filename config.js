const { env } = process;

const nodeEnv = env.NODE_ENV || "dev";

module.exports = {
  env: nodeEnv,
  server: { port: env.PORT || 9000, host: env.HOST || `127.0.0.1` },
  dbUrl:
    env.MONGODB_URL ||
    "mongodb://dbuser:password1@ds157707.mlab.com:57707/contacts-manager",
  apiBaseUrl: `/api/v1`,
  authSecret: "12jfdhzf6^hbjcnjfhhfuf7634ieoknjd_chdhfjnfbhvb"
};
