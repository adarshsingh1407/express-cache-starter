const SERVER_CONFIG = {
  DEFAULT_PORT: 8081,
  MORGAN_FORMAT: '(STATUS~:status) ":method :url HTTP/:http-version" (REM_ADDR~:remote-addr) (RES_TIME~:response-time[3]) (REM_USER~:remote-user) (RES_CON_LENGTH~:res[content-length]) (REFERRER~:referrer) (USER_AGENT~:user-agent)',
  COMPRESSION_OPTIONS: {
    level: 1
  }
}

module.exports = SERVER_CONFIG;
