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
  FileDownloadCreateData,
  FileDownloadCreateError,
  FileDownloadCreatePayload,
  FileUploadCheckCreateData,
  FileUploadCheckCreateError,
  FileUploadCheckCreatePayload,
  FileUploadCreateData,
  FileUploadCreateError,
  FileUploadCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class File<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags file
 * @name FileUploadCheckCreate
 * @request POST:/api/file/upload/check
 * @secure
 * @response `200` `FileUploadCheckCreateData` Upload check successful
 * @response `400` `{
    status: "error",
    code: "bad_request",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 * @response `401` `{
    status: "error",
    code: "unauthorized",
  \**
   * A human readable explanation of what went wrong.
   * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 * @response `403` `{
    status: "error",
    code: "forbidden",
  \**
   * A human readable explanation of what went wrong.
   * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
 * @response `404` `{
    status: "error",
    code: "not_found",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot find the requested resource."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server cannot find the requested resource.
 * @response `409` `{
    status: "error",
    code: "conflict",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when a request conflicts with the current state of the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` This response is sent when a request conflicts with the current state of the server.
 * @response `410` `{
    status: "error",
    code: "invite_expired",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
 * @response `422` `{
    status: "error",
    code: "unprocessable_entity",
  \**
   * A human readable explanation of what went wrong.
   * @default "The request was well-formed but was unable to be followed due to semantic errors."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The request was well-formed but was unable to be followed due to semantic errors.
 * @response `429` `{
    status: "error",
    code: "rate_limit_exceeded",
  \**
   * A human readable explanation of what went wrong.
   * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The user has sent too many requests in a given amount of time ("rate limiting")
 * @response `500` `{
    status: "error",
    code: "internal_server_error",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server has encountered a situation it does not know how to handle."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server has encountered a situation it does not know how to handle.
 */
  fileUploadCheckCreate = (data: FileUploadCheckCreatePayload, params: RequestParams = {}) =>
    this.http.request<FileUploadCheckCreateData, FileUploadCheckCreateError>({
      path: `/api/file/upload/check`,
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
 * @tags file
 * @name FileUploadCreate
 * @request POST:/api/file/upload
 * @secure
 * @response `200` `FileUploadCreateData` Upload file successful
 * @response `400` `{
    status: "error",
    code: "bad_request",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 * @response `401` `{
    status: "error",
    code: "unauthorized",
  \**
   * A human readable explanation of what went wrong.
   * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 * @response `403` `{
    status: "error",
    code: "forbidden",
  \**
   * A human readable explanation of what went wrong.
   * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
 * @response `404` `{
    status: "error",
    code: "not_found",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot find the requested resource."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server cannot find the requested resource.
 * @response `409` `{
    status: "error",
    code: "conflict",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when a request conflicts with the current state of the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` This response is sent when a request conflicts with the current state of the server.
 * @response `410` `{
    status: "error",
    code: "invite_expired",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
 * @response `422` `{
    status: "error",
    code: "unprocessable_entity",
  \**
   * A human readable explanation of what went wrong.
   * @default "The request was well-formed but was unable to be followed due to semantic errors."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The request was well-formed but was unable to be followed due to semantic errors.
 * @response `429` `{
    status: "error",
    code: "rate_limit_exceeded",
  \**
   * A human readable explanation of what went wrong.
   * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The user has sent too many requests in a given amount of time ("rate limiting")
 * @response `500` `{
    status: "error",
    code: "internal_server_error",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server has encountered a situation it does not know how to handle."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server has encountered a situation it does not know how to handle.
 */
  fileUploadCreate = (data: FileUploadCreatePayload, params: RequestParams = {}) =>
    this.http.request<FileUploadCreateData, FileUploadCreateError>({
      path: `/api/file/upload`,
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
 * @tags file
 * @name FileDownloadCreate
 * @request POST:/api/file/download
 * @secure
 * @response `200` `FileDownloadCreateData` Download successful
 * @response `400` `{
    status: "error",
    code: "bad_request",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 * @response `401` `{
    status: "error",
    code: "unauthorized",
  \**
   * A human readable explanation of what went wrong.
   * @default "Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 * @response `403` `{
    status: "error",
    code: "forbidden",
  \**
   * A human readable explanation of what went wrong.
   * @default "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
 * @response `404` `{
    status: "error",
    code: "not_found",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server cannot find the requested resource."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server cannot find the requested resource.
 * @response `409` `{
    status: "error",
    code: "conflict",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when a request conflicts with the current state of the server."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` This response is sent when a request conflicts with the current state of the server.
 * @response `410` `{
    status: "error",
    code: "invite_expired",
  \**
   * A human readable explanation of what went wrong.
   * @default "This response is sent when the requested content has been permanently deleted from server, with no forwarding address."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
 * @response `422` `{
    status: "error",
    code: "unprocessable_entity",
  \**
   * A human readable explanation of what went wrong.
   * @default "The request was well-formed but was unable to be followed due to semantic errors."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The request was well-formed but was unable to be followed due to semantic errors.
 * @response `429` `{
    status: "error",
    code: "rate_limit_exceeded",
  \**
   * A human readable explanation of what went wrong.
   * @default "The user has sent too many requests in a given amount of time ("rate limiting")"
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The user has sent too many requests in a given amount of time ("rate limiting")
 * @response `500` `{
    status: "error",
    code: "internal_server_error",
  \**
   * A human readable explanation of what went wrong.
   * @default "The server has encountered a situation it does not know how to handle."
   * @example "The requested resource was not found."
   *\
    message?: string,

}` The server has encountered a situation it does not know how to handle.
 */
  fileDownloadCreate = (data: FileDownloadCreatePayload, params: RequestParams = {}) =>
    this.http.request<FileDownloadCreateData, FileDownloadCreateError>({
      path: `/api/file/download`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
