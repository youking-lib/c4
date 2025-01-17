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

export interface ProjectFileUploadCheckCreatePayload {
  filename: string;
  type: string;
  size: number;
  hash: string;
}

export type ProjectFileUploadCheckCreateData =
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

export interface ProjectFileDownloadDetailData {
  downloadUrl: string;
}

export interface ProjectCodeDetailData {
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

export interface AuthUserCreateData {
  status: "success";
  data: any;
}

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
