import 'package:Notaty/core/model/base_response.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:retrofit/retrofit.dart';

import '../../../../core/networking/api_constants.dart';
import '../../../../core/networking/typed_extras.dart';
import '../model/login/login_request.dart';
import '../model/login/login_response.dart';
import '../model/register/register_request.dart';
import '../model/register/register_response.dart';

part 'auth_data_sources.g.dart';

@lazySingleton
@RestApi()
abstract class AuthDataSources {
  @factoryMethod
  factory AuthDataSources(Dio dio) {
    return _AuthDataSources(dio, baseUrl: ApiConstants.baseUrl);
  }

  @POST(ApiConstants.loginEndpoint)
  @TypedExtrasOptions(includeToken: false)
  Future<BaseResponse<LoginResponse>> login(@Body() LoginRequest loginRequest);

  @POST(ApiConstants.registerEndpoint)
  @TypedExtrasOptions(includeToken: false)
  Future<BaseResponse<RegisterResponse>> register(
    @Body() RegisterRequest registerRequest,
  );
}
