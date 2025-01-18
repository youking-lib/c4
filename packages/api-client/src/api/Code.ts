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

import { ProjectCodeDetailData } from "./data-contracts";
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
   * @name ProjectCodeDetail
   * @request GET:/api/project/{projectId}/code/{codeId}
   * @secure
   * @response `200` `ProjectCodeDetailData` Retrieve code successful
   */
  projectCodeDetail = (projectId: string, codeId: string, params: RequestParams = {}) =>
    this.http.request<ProjectCodeDetailData, any>({
      path: `/api/project/${projectId}/code/${codeId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
