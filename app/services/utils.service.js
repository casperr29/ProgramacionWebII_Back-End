const Utilities = {
  REGEX_VALD_EMAIL: {
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    name: 'valid_email',
  },
  REGEX_VALD_PASSWORD: {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}/,
    name: 'valid_password',
  },
  REGEX_VALD_NAME: {
    pattern: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    name: 'valid_name',
  },
  REGEX_VALD_OBJECT_ID: {
    pattern: /^[a-zA-Z0-9]{24}$/,
    name: 'valid_object_id',
  },

  REGEX_VALD_HEX_COLOR: {
    pattern: /^#[a-fA-F0-9]{6}$/,
    name: 'valid_hexadecimal_color',
  },

  NOT_FOUND_COLL_MSG: "Collection doesn't exists",
  NO_USERS_REGISTERED_MSG: 'There are no users registered',
  USER_NOT_FOUND_MSG: 'User not found: ',
};

module.exports = {
  Utilities,
};
