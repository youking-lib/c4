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
  AuthOtpSendCodeCreateData,
  AuthOtpSendCodeCreatePayload,
  AuthOtpVerifyCodeCreateData,
  AuthOtpVerifyCodeCreatePayload,
  AuthUserCreateData,
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
   * @name AuthUserCreate
   * @request POST:/api/auth/user
   * @secure
   */
  authUserCreate = (params: RequestParams = {}) =>
    this.http.request<AuthUserCreateData, any>({
      path: `/api/auth/user`,
      method: "POST",
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
   */
  authOtpSendCodeCreate = (data: AuthOtpSendCodeCreatePayload, params: RequestParams = {}) =>
    this.http.request<AuthOtpSendCodeCreateData, any>({
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
   */
  authOtpVerifyCodeCreate = (data: AuthOtpVerifyCodeCreatePayload, params: RequestParams = {}) =>
    this.http.request<AuthOtpVerifyCodeCreateData, any>({
      path: `/api/auth/otp/verify/code`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
