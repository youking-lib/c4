/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface FileUploadCheckCreatePayload {
  filename: string;
  type: string;
  size: number;
  hash: string;
}

export type FileUploadCheckCreateData =
  | {
      file: {
        id: string;
        name: string;
        size: number;
        type: string;
        disabled: boolean;
        key: string;
        hash: string;
        createdAt: string;
        updatedAt: string;
        downloads: number;
        lastDownloadedAt?: string | null;
        projectId?: string | null;
        ownerId?: string | null;
        codeId?: string | null;
      };
    }
  | {
      key: string;
      preSignedUrl: string;
    };

export interface FileDownloadDetailData {
  downloadUrl: string;
}

export interface CodeDetailData {
  files: {
    id: string;
    name: string;
    size: number;
    type: string;
    disabled: boolean;
    key: string;
    hash: string;
    createdAt: string;
    updatedAt: string;
    downloads: number;
    lastDownloadedAt?: string | null;
    projectId?: string | null;
    ownerId?: string | null;
    codeId?: string | null;
  }[];
}

export interface AuthMeListData {
  status: "success";
  data: {
    uid: string;
    name: string;
    email: string;
    projectId: string;
    projectName: string;
  };
}

export type AuthMeListError =
  | {
      status: "error";
      error: {
        code: "bad_request";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "unauthorized";
        /**
         * A human readable explanation of what went wrong.
         * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "forbidden";
        /**
         * A human readable explanation of what went wrong.
         * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "not_found";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server cannot find the requested resource."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "conflict";
        /**
         * A human readable explanation of what went wrong.
         * @default "This response is sent when a request conflicts with the current state of the server."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "invite_expired";
        /**
         * A human readable explanation of what went wrong.
         * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "unprocessable_entity";
        /**
         * A human readable explanation of what went wrong.
         * @default "The request was well-formed but was unable to be followed due to semantic errors."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "rate_limit_exceeded";
        /**
         * A human readable explanation of what went wrong.
         * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "internal_server_error";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server has encountered a situation it does not know how to handle."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    };

export interface AuthOtpSendCodeCreatePayload {
  /** @format email */
  email: string;
}

export interface AuthOtpSendCodeCreateData {
  status: "success";
  data: {
    nonce: string;
  };
}

export type AuthOtpSendCodeCreateError =
  | {
      status: "error";
      error: {
        code: "bad_request";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "unauthorized";
        /**
         * A human readable explanation of what went wrong.
         * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "forbidden";
        /**
         * A human readable explanation of what went wrong.
         * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "not_found";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server cannot find the requested resource."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "conflict";
        /**
         * A human readable explanation of what went wrong.
         * @default "This response is sent when a request conflicts with the current state of the server."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "invite_expired";
        /**
         * A human readable explanation of what went wrong.
         * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "unprocessable_entity";
        /**
         * A human readable explanation of what went wrong.
         * @default "The request was well-formed but was unable to be followed due to semantic errors."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "rate_limit_exceeded";
        /**
         * A human readable explanation of what went wrong.
         * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "internal_server_error";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server has encountered a situation it does not know how to handle."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    };

export interface AuthOtpVerifyCodeCreatePayload {
  nonce: string;
  code: string;
}

export interface AuthOtpVerifyCodeCreateData {
  status: "success";
  data: {
    accessToken: string;
    refreshToken: string;
    newUser: boolean;
  };
}

export type AuthOtpVerifyCodeCreateError =
  | {
      status: "error";
      error: {
        code: "bad_request";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "unauthorized";
        /**
         * A human readable explanation of what went wrong.
         * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "forbidden";
        /**
         * A human readable explanation of what went wrong.
         * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "not_found";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server cannot find the requested resource."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "conflict";
        /**
         * A human readable explanation of what went wrong.
         * @default "This response is sent when a request conflicts with the current state of the server."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "invite_expired";
        /**
         * A human readable explanation of what went wrong.
         * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "unprocessable_entity";
        /**
         * A human readable explanation of what went wrong.
         * @default "The request was well-formed but was unable to be followed due to semantic errors."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "rate_limit_exceeded";
        /**
         * A human readable explanation of what went wrong.
         * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    }
  | {
      status: "error";
      error: {
        code: "internal_server_error";
        /**
         * A human readable explanation of what went wrong.
         * @default "The server has encountered a situation it does not know how to handle."
         * @example "The requested resource was not found."
         */
        message?: string;
      };
    };
