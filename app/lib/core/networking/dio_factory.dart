import 'package:Notaty/core/networking/api_constants.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

@singleton
/// DioFactory class is responsible for creating and configuring Dio instances.
class DioFactory {
  late final Dio _dio;

  DioFactory() {
    const timeout = Duration(seconds: 30);

    _dio =
        Dio()
          ..options.connectTimeout = timeout
          ..options.receiveTimeout = timeout;

    _addDioInterceptor();
    _addHeaders();
  }

  Dio get dio => _dio;

  void _addHeaders() {
    dio.options.headers.addAll({
      ApiHeaders.contentType: ApiHeaders.applicationJson,
      ApiHeaders.accept: ApiHeaders.applicationJson,
    });
  }

  void _addDioInterceptor() {
    dio.interceptors.add(PrettyDioLogger(request: true, responseHeader: true));
  }
}

@module
abstract class DioModule {
  @singleton
  Dio dio(DioFactory factory) => factory.dio;
}
