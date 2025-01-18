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

import {
  AuthMeListData,
  AuthMeListError,
  AuthOtpSendCodeCreateData,
  AuthOtpSendCodeCreateError,
  AuthOtpSendCodeCreatePayload,
  AuthOtpVerifyCodeCreateData,
  AuthOtpVerifyCodeCreateError,
  AuthOtpVerifyCodeCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags auth
 * @name AuthMeList
 * @request GET:/api/auth/me
 * @secure
 * @response `200` `AuthMeListData` Login successful
 * @response `400` `{
    status: "error",
    error: {
    code: "bad_request",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 * @response `401` `{
    status: "error",
    error: {
    code: "unauthorized",
  \**
   * A human readable explanation of what went wrong.
   * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 * @response `403` `{
    status: "error",
    error: {
    code: "forbidden",
  \**
   * A human readable explanation of what went wrong.
   * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
 * @response `404` `{
    status: "error",
    error: {
    code: "not_found",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot find the requested resource."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server cannot find the requested resource.
 * @response `409` `{
    status: "error",
    error: {
    code: "conflict",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when a request conflicts with the current state of the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` This response is sent when a request conflicts with the current state of the server.
 * @response `410` `{
    status: "error",
    error: {
    code: "invite_expired",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
 * @response `422` `{
    status: "error",
    error: {
    code: "unprocessable_entity",
  \**
   * A human readable explanation of what went wrong.
   * @default "The request was well-formed but was unable to be followed due to semantic errors."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The request was well-formed but was unable to be followed due to semantic errors.
 * @response `429` `{
    status: "error",
    error: {
    code: "rate_limit_exceeded",
  \**
   * A human readable explanation of what went wrong.
   * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The user has sent too many requests in a given amount of time ("rate limiting")
 * @response `500` `{
    status: "error",
    error: {
    code: "internal_server_error",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server has encountered a situation it does not know how to handle."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server has encountered a situation it does not know how to handle.
 */
  authMeList = (params: RequestParams = {}) =>
    this.http.request<AuthMeListData, AuthMeListError>({
      path: `/api/auth/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description send otp code
 *
 * @tags auth
 * @name AuthOtpSendCodeCreate
 * @request POST:/api/auth/otp/send-code
 * @secure
 * @response `200` `AuthOtpSendCodeCreateData` send otp code successful
 * @response `400` `{
    status: "error",
    error: {
    code: "bad_request",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 * @response `401` `{
    status: "error",
    error: {
    code: "unauthorized",
  \**
   * A human readable explanation of what went wrong.
   * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 * @response `403` `{
    status: "error",
    error: {
    code: "forbidden",
  \**
   * A human readable explanation of what went wrong.
   * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
 * @response `404` `{
    status: "error",
    error: {
    code: "not_found",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot find the requested resource."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server cannot find the requested resource.
 * @response `409` `{
    status: "error",
    error: {
    code: "conflict",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when a request conflicts with the current state of the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` This response is sent when a request conflicts with the current state of the server.
 * @response `410` `{
    status: "error",
    error: {
    code: "invite_expired",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
 * @response `422` `{
    status: "error",
    error: {
    code: "unprocessable_entity",
  \**
   * A human readable explanation of what went wrong.
   * @default "The request was well-formed but was unable to be followed due to semantic errors."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The request was well-formed but was unable to be followed due to semantic errors.
 * @response `429` `{
    status: "error",
    error: {
    code: "rate_limit_exceeded",
  \**
   * A human readable explanation of what went wrong.
   * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The user has sent too many requests in a given amount of time ("rate limiting")
 * @response `500` `{
    status: "error",
    error: {
    code: "internal_server_error",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server has encountered a situation it does not know how to handle."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server has encountered a situation it does not know how to handle.
 */
  authOtpSendCodeCreate = (data: AuthOtpSendCodeCreatePayload, params: RequestParams = {}) =>
    this.http.request<AuthOtpSendCodeCreateData, AuthOtpSendCodeCreateError>({
      path: `/api/auth/otp/send-code`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
 * No description
 *
 * @tags auth
 * @name AuthOtpVerifyCodeCreate
 * @request POST:/api/auth/otp/verify/code
 * @secure
 * @response `200` `AuthOtpVerifyCodeCreateData` verify otp code successful
 * @response `400` `{
    status: "error",
    error: {
    code: "bad_request",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 * @response `401` `{
    status: "error",
    error: {
    code: "unauthorized",
  \**
   * A human readable explanation of what went wrong.
   * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 * @response `403` `{
    status: "error",
    error: {
    code: "forbidden",
  \**
   * A human readable explanation of what went wrong.
   * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
 * @response `404` `{
    status: "error",
    error: {
    code: "not_found",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot find the requested resource."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server cannot find the requested resource.
 * @response `409` `{
    status: "error",
    error: {
    code: "conflict",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when a request conflicts with the current state of the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` This response is sent when a request conflicts with the current state of the server.
 * @response `410` `{
    status: "error",
    error: {
    code: "invite_expired",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
 * @response `422` `{
    status: "error",
    error: {
    code: "unprocessable_entity",
  \**
   * A human readable explanation of what went wrong.
   * @default "The request was well-formed but was unable to be followed due to semantic errors."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The request was well-formed but was unable to be followed due to semantic errors.
 * @response `429` `{
    status: "error",
    error: {
    code: "rate_limit_exceeded",
  \**
   * A human readable explanation of what went wrong.
   * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The user has sent too many requests in a given amount of time ("rate limiting")
 * @response `500` `{
    status: "error",
    error: {
    code: "internal_server_error",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server has encountered a situation it does not know how to handle."
   * @example "The requested resource was not found."
   *\
    message?: string,

},

}` The server has encountered a situation it does not know how to handle.
 */
  authOtpVerifyCodeCreate = (data: AuthOtpVerifyCodeCreatePayload, params: RequestParams = {}) =>
    this.http.request<AuthOtpVerifyCodeCreateData, AuthOtpVerifyCodeCreateError>({
      path: `/api/auth/otp/verify/code`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
