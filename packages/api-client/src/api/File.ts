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
  ProjectFileDownloadDetailData,
  ProjectFileUploadCheckCreateData,
  ProjectFileUploadCheckCreatePayload,
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
   * @name ProjectFileUploadCheckCreate
   * @request POST:/api/project/{projectId}/file/upload/check
   * @secure
   */
  projectFileUploadCheckCreate = (
    projectId: string,
    data: ProjectFileUploadCheckCreatePayload,
    params: RequestParams = {},
  ) =>
    this.http.request<ProjectFileUploadCheckCreateData, any>({
      path: `/api/project/${projectId}/file/upload/check`,
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
   * @name ProjectFileDownloadDetail
   * @request GET:/api/project/{projectId}/file/download/{fileId}
   * @secure
   */
  projectFileDownloadDetail = (projectId: string, fileId: string, params: RequestParams = {}) =>
    this.http.request<ProjectFileDownloadDetailData, any>({
      path: `/api/project/${projectId}/file/download/${fileId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
