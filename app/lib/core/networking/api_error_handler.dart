// ignore_for_file: constant_identifier_names, non_constant_identifier_names

import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';

import 'api_error_model.dart';

enum DataSource {
  NO_CONTENT,
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONNECT_TIMEOUT,
  CANCEL,
  RECEIVE_TIMEOUT,
  SEND_TIMEOUT,
  CACHE_ERROR,
  NO_INTERNET_CONNECTION,
  // API_LOGIC_ERROR,
  DEFAULT,
}

class ResponseMessage {
  static const String NO_CONTENT = "api_error.default";
  static const String BAD_REQUEST = "api_error.default";
  static const String UNAUTHORIZED = "api_error.token_invalidated";
  static const String FORBIDDEN = "api_error.default";
  static const String INTERNAL_SERVER_ERROR = "api_error.default";
  static const String NOT_FOUND = "api_error.default";

  // local status code
  static const String CONNECT_TIMEOUT = "api_error.connection_timeout";
  static const String CANCEL = "api_error.cancel";
  static const String RECEIVE_TIMEOUT = "api_error.receive_timeout";
  static const String SEND_TIMEOUT = "api_error.send_timeout";
  static const String CACHE_ERROR = "api_error.connection_error";
  static const String NO_INTERNET_CONNECTION = "api_error.connection_error";
  static const String DEFAULT = "api_error.default";
}

extension DataSourceExtension on DataSource {
  ApiErrorModel getFailure() {
    switch (this) {
      case DataSource.NO_CONTENT:
        return ApiErrorModel(message: ResponseMessage.NO_CONTENT.tr());
      case DataSource.BAD_REQUEST:
        return ApiErrorModel(message: ResponseMessage.BAD_REQUEST.tr());
      case DataSource.FORBIDDEN:
        return ApiErrorModel(message: ResponseMessage.FORBIDDEN.tr());
      case DataSource.UNAUTHORIZED:
        return ApiErrorModel(message: ResponseMessage.UNAUTHORIZED.tr());
      case DataSource.NOT_FOUND:
        return ApiErrorModel(message: ResponseMessage.NOT_FOUND.tr());
      case DataSource.INTERNAL_SERVER_ERROR:
        return ApiErrorModel(
          message: ResponseMessage.INTERNAL_SERVER_ERROR.tr(),
        );
      case DataSource.CONNECT_TIMEOUT:
        return ApiErrorModel(message: ResponseMessage.CONNECT_TIMEOUT.tr());
      case DataSource.CANCEL:
        return ApiErrorModel(message: ResponseMessage.CANCEL.tr());
      case DataSource.RECEIVE_TIMEOUT:
        return ApiErrorModel(message: ResponseMessage.RECEIVE_TIMEOUT.tr());
      case DataSource.SEND_TIMEOUT:
        return ApiErrorModel(message: ResponseMessage.SEND_TIMEOUT.tr());
      case DataSource.CACHE_ERROR:
        return ApiErrorModel(message: ResponseMessage.CACHE_ERROR.tr());
      case DataSource.NO_INTERNET_CONNECTION:
        return ApiErrorModel(
          message: ResponseMessage.NO_INTERNET_CONNECTION.tr(),
        );
      case DataSource.DEFAULT:
        return ApiErrorModel(message: ResponseMessage.DEFAULT.tr());
    }
  }
}

class ErrorHandler implements Exception {
  late ApiErrorModel apiErrorModel;

  ErrorHandler.handle(dynamic error) {
    if (error is DioException) {
      // dio error so its an error from response of the API or from dio itself
      apiErrorModel = _handleError(error);
    } else {
      // default error
      apiErrorModel = DataSource.DEFAULT.getFailure();
    }
  }
}

ApiErrorModel _handleError(DioException error) {
  switch (error.type) {
    case DioExceptionType.connectionTimeout:
      return DataSource.CONNECT_TIMEOUT.getFailure();
    case DioExceptionType.sendTimeout:
      return DataSource.SEND_TIMEOUT.getFailure();
    case DioExceptionType.receiveTimeout:
      return DataSource.RECEIVE_TIMEOUT.getFailure();
    case DioExceptionType.badResponse:
      if (error.response != null &&
          error.response?.statusCode != null &&
          error.response?.statusMessage != null) {
        return ApiErrorModel.fromJson(error.response!.data);
      } else {
        return DataSource.DEFAULT.getFailure();
      }
    case DioExceptionType.unknown:
      if (error.response != null &&
          error.response?.statusCode != null &&
          error.response?.statusMessage != null) {
        return ApiErrorModel.fromJson(error.response!.data);
      } else {
        return DataSource.DEFAULT.getFailure();
      }
    case DioExceptionType.cancel:
      return DataSource.CANCEL.getFailure();
    case DioExceptionType.connectionError:
      return DataSource.DEFAULT.getFailure();
    case DioExceptionType.badCertificate:
      return DataSource.DEFAULT.getFailure();
  }
}

class ApiInternalStatus {
  static const int SUCCESS = 0;
  static const int FAILURE = 1;
}
