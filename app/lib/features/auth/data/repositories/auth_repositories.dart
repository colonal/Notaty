import 'package:injectable/injectable.dart';

import '../../../../core/networking/api_error_handler.dart';
import '../../../../core/networking/api_result.dart';
import '../data_sources/auth_data_sources.dart';
import '../model/login/login_request.dart';
import '../model/login/login_response.dart';
import '../model/register/register_request.dart';
import '../model/register/register_response.dart';

@LazySingleton()
class AuthRepositories {
  final AuthDataSources _authDataSources;

  AuthRepositories({required AuthDataSources authDataSources})
    : _authDataSources = authDataSources;

  Future<ApiResult<LoginResponse>> login(LoginRequest loginRequest) async {
    try {
      final response = await _authDataSources.login(loginRequest);
      return ApiResult.success(response.data!);
    } catch (e) {
      return ApiResult.failure(ErrorHandler.handle(e));
    }
  }

  Future<ApiResult<RegisterResponse>> register(
    RegisterRequest registerRequest,
  ) async {
    try {
      final response = await _authDataSources.register(registerRequest);
      return ApiResult.success(response.data!);
    } catch (e) {
      return ApiResult.failure(ErrorHandler.handle(e));
    }
  }
}
