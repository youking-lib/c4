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

import { CodeDetailData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Code<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags code
   * @name CodeDetail
   * @request GET:/api/code/{codeId}
   * @secure
   * @response `200` `CodeDetailData` Retrieve code successful
   */
  codeDetail = (projectId: string, codeId: string, params: RequestParams = {}) =>
    this.http.request<CodeDetailData, any>({
      path: `/api/code/${codeId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
