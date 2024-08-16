export const HASH_EXPIRE_TIME = 60 * 24 * 30; // in minutes
export const COOKIE_EXPIRE_TIME = 60 * 60; // in seconds

interface HttpStatus {
  status: number;
  message: string;
}

interface HttpStatusCategory {
  [key: string]: HttpStatus;
}

interface HttpStatusCodes {
  informational: {
    Continue: HttpStatus;
    SwitchingProtocols: HttpStatus;
  };
  success: {
    OK: HttpStatus;
    Created: HttpStatus;
    Accepted: HttpStatus;
    NonAuthoritativeInformation: HttpStatus;
    NoContent: HttpStatus;
    ResetContent: HttpStatus;
    PartialContent: HttpStatus;
  };
  redirection: {
    MultipleChoices: HttpStatus;
    MovedPermanently: HttpStatus;
    Found: HttpStatus;
    SeeOther: HttpStatus;
    NotModified: HttpStatus;
    UseProxy: HttpStatus;
    TemporaryRedirect: HttpStatus;
    PermanentRedirect: HttpStatus;
  };
  clientErrors: {
    BadRequest: HttpStatus;
    Unauthorized: HttpStatus;
    PaymentRequired: HttpStatus;
    Forbidden: HttpStatus;
    NotFound: HttpStatus;
    MethodNotAllowed: HttpStatus;
    NotAcceptable: HttpStatus;
    ProxyAuthenticationRequired: HttpStatus;
    RequestTimeout: HttpStatus;
    Conflict: HttpStatus;
    Gone: HttpStatus;
    LengthRequired: HttpStatus;
    PreconditionFailed: HttpStatus;
    PayloadTooLarge: HttpStatus;
    URITooLong: HttpStatus;
    UnsupportedMediaType: HttpStatus;
    RangeNotSatisfiable: HttpStatus;
    ExpectationFailed: HttpStatus;
    ImATeapot: HttpStatus;
    MisdirectedRequest: HttpStatus;
    UnprocessableEntity: HttpStatus;
    Locked: HttpStatus;
    FailedDependency: HttpStatus;
    TooEarly: HttpStatus;
    UpgradeRequired: HttpStatus;
    PreconditionRequired: HttpStatus;
    TooManyRequests: HttpStatus;
  };
  serverErrors: {
    InternalServerError: HttpStatus;
    NotImplemented: HttpStatus;
    BadGateway: HttpStatus;
    ServiceUnavailable: HttpStatus;
    GatewayTimeout: HttpStatus;
    HTTPVersionNotSupported: HttpStatus;
    VariantAlsoNegotiates: HttpStatus;
    InsufficientStorage: HttpStatus;
    LoopDetected: HttpStatus;
    NotExtended: HttpStatus;
    NetworkAuthenticationRequired: HttpStatus;
  };
}

export const HTTP_STATUS_CODES: HttpStatusCodes = {
  informational: {
    Continue: { status: 100, message: "Continue" },
    SwitchingProtocols: { status: 101, message: "Switching Protocols" },
  },
  success: {
    OK: { status: 200, message: "OK" },
    Created: { status: 201, message: "Created" },
    Accepted: { status: 202, message: "Accepted" },
    NonAuthoritativeInformation: {
      status: 203,
      message: "Non-Authoritative Information",
    },
    NoContent: { status: 204, message: "No Content" },
    ResetContent: { status: 205, message: "Reset Content" },
    PartialContent: { status: 206, message: "Partial Content" },
  },
  redirection: {
    MultipleChoices: { status: 300, message: "Multiple Choices" },
    MovedPermanently: { status: 301, message: "Moved Permanently" },
    Found: { status: 302, message: "Found" },
    SeeOther: { status: 303, message: "See Other" },
    NotModified: { status: 304, message: "Not Modified" },
    UseProxy: { status: 305, message: "Use Proxy" },
    TemporaryRedirect: { status: 307, message: "Temporary Redirect" },
    PermanentRedirect: { status: 308, message: "Permanent Redirect" },
  },
  clientErrors: {
    BadRequest: { status: 400, message: "Bad Request" },
    Unauthorized: { status: 401, message: "Unauthorized" },
    PaymentRequired: { status: 402, message: "Payment Required" },
    Forbidden: { status: 403, message: "Forbidden" },
    NotFound: { status: 404, message: "Not Found" },
    MethodNotAllowed: { status: 405, message: "Method Not Allowed" },
    NotAcceptable: { status: 406, message: "Not Acceptable" },
    ProxyAuthenticationRequired: {
      status: 407,
      message: "Proxy Authentication Required",
    },
    RequestTimeout: { status: 408, message: "Request Timeout" },
    Conflict: { status: 409, message: "Conflict" },
    Gone: { status: 410, message: "Gone" },
    LengthRequired: { status: 411, message: "Length Required" },
    PreconditionFailed: { status: 412, message: "Precondition Failed" },
    PayloadTooLarge: { status: 413, message: "Payload Too Large" },
    URITooLong: { status: 414, message: "URI Too Long" },
    UnsupportedMediaType: { status: 415, message: "Unsupported Media Type" },
    RangeNotSatisfiable: { status: 416, message: "Range Not Satisfiable" },
    ExpectationFailed: { status: 417, message: "Expectation Failed" },
    ImATeapot: { status: 418, message: "I'm a teapot" },
    MisdirectedRequest: { status: 421, message: "Misdirected Request" },
    UnprocessableEntity: { status: 422, message: "Unprocessable Entity" },
    Locked: { status: 423, message: "Locked" },
    FailedDependency: { status: 424, message: "Failed Dependency" },
    TooEarly: { status: 425, message: "Too Early" },
    UpgradeRequired: { status: 426, message: "Upgrade Required" },
    PreconditionRequired: { status: 428, message: "Precondition Required" },
    TooManyRequests: { status: 429, message: "Too Many Requests" },
  },
  serverErrors: {
    InternalServerError: { status: 500, message: "Internal Server Error" },
    NotImplemented: { status: 501, message: "Not Implemented" },
    BadGateway: { status: 502, message: "Bad Gateway" },
    ServiceUnavailable: { status: 503, message: "Service Unavailable" },
    GatewayTimeout: { status: 504, message: "Gateway Timeout" },
    HTTPVersionNotSupported: {
      status: 505,
      message: "HTTP Version Not Supported",
    },
    VariantAlsoNegotiates: { status: 506, message: "Variant Also Negotiates" },
    InsufficientStorage: { status: 507, message: "Insufficient Storage" },
    LoopDetected: { status: 508, message: "Loop Detected" },
    NotExtended: { status: 510, message: "Not Extended" },
    NetworkAuthenticationRequired: {
      status: 511,
      message: "Network Authentication Required",
    },
  },
};
