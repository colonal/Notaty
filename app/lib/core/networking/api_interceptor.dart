import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

import '../services/user_services.dart';
import 'typed_extras.dart';

@injectable
class ApiInterceptor extends Interceptor {
  final UserServices _userServices;

  ApiInterceptor({required UserServices userServices})
    : _userServices = userServices;

  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final extras = TypedExtrasOptions.fromMap(options.extra);

    if (extras.includeToken) {
      final token = await _userServices.getToken();
      if (token != null) {
        options.headers['Authorization'] = 'Bearer $token';
      }
    }
    super.onRequest(options, handler);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    if ((response.statusCode == 200 &&
        response.data != null &&
        response.data is Map<String, dynamic>)) {
      final data = response.data as Map<String, dynamic>;
      if (data['success'] == false) {
        return handler.reject(
          DioException(
            requestOptions: response.requestOptions,
            response: response,
            type: DioExceptionType.unknown,
          ),
        );
      }
    }

    super.onResponse(response, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 401) {
      _userServices.logout();
    }
    super.onError(err, handler);
  }
}
