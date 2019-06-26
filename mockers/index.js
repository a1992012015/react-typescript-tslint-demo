const proxy = {
  "POST /api/list": function(name) {
    return {
      name: name,
    };
  },
  "POST /api/oauth/token": function() {
    return {
      "access_token": "574af18f30d05dd9558294392b46ca22",
      "example_parameter": "example_value",
      "expires_in": 3600,
      "refresh_token": "tGzv3JOkF0XG5Qx2TlKWIA",
      "token_type": "example",
    };
  },
};

module.exports = proxy;
