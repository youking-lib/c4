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
  CodeCreateData,
  CodeCreateError,
  CodeCreatePayload,
  CodeDeleteData,
  CodeDeleteError,
  CodeDetailData,
  CodeDetailError,
  CodeListData,
  CodeListError,
  CodeListParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Code<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags code
 * @name CodeList
 * @request GET:/api/code
 * @secure
 * @response `200` `CodeListData` List codes successful
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
  codeList = (query: CodeListParams, params: RequestParams = {}) =>
    this.http.request<CodeListData, CodeListError>({
      path: `/api/code`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * No description
 *
 * @tags code
 * @name CodeCreate
 * @request POST:/api/code
 * @secure
 * @response `200` `CodeCreateData` Create code successful
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
  codeCreate = (data: CodeCreatePayload, params: RequestParams = {}) =>
    this.http.request<CodeCreateData, CodeCreateError>({
      path: `/api/code`,
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
 * @tags code
 * @name CodeDetail
 * @request GET:/api/code/{codeId}
 * @secure
 * @response `200` `CodeDetailData` Retrieve code successful
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
  codeDetail = (codeId: string, params: RequestParams = {}) =>
    this.http.request<CodeDetailData, CodeDetailError>({
      path: `/api/code/${codeId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * No description
 *
 * @tags code
 * @name CodeDelete
 * @request DELETE:/api/code/{codeId}
 * @secure
 * @response `200` `CodeDeleteData` Revoke code successful
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
  codeDelete = (codeId: string, params: RequestParams = {}) =>
    this.http.request<CodeDeleteData, CodeDeleteError>({
      path: `/api/code/${codeId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
}
