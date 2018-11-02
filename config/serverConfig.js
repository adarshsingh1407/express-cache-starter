const SERVER_CONFIG = {
  DEFAULT_PORT: 8081,
  MORGAN_FORMAT: '(STATUS~:status) ":method :url HTTP/:http-version" (REM_ADDR~:remote-addr) (RES_TIME~:response-time[3]) (REM_USER~:remote-user) (RES_CON_LENGTH~:res[content-length]) (REFERRER~:referrer) (USER_AGENT~:user-agent)',
  COMPRESSION_OPTIONS: {
    level: 1
  },
  BODY_PARSER_OPTIONS: {
    JSON: {
      limit: '500mb'
    },
    URL_ENCODED: {
      extended: false
    }
  }
}

module.exports = SERVER_CONFIG;
