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

import { FileDownloadDetailData, FileUploadCheckCreateData, FileUploadCheckCreatePayload } from "./data-contracts";
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
   * @response `200` `FileUploadCheckCreateData` Upload successful
   */
  fileUploadCheckCreate = (data: FileUploadCheckCreatePayload, params: RequestParams = {}) =>
    this.http.request<FileUploadCheckCreateData, any>({
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
   * @name FileDownloadDetail
   * @request GET:/api/file/download/{fileId}
   * @secure
   * @response `200` `FileDownloadDetailData` Download successful
   */
  fileDownloadDetail = (fileId: string, params: RequestParams = {}) =>
    this.http.request<FileDownloadDetailData, any>({
      path: `/api/file/download/${fileId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
