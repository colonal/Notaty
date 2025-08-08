import 'package:Notaty/core/model/base_response.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:retrofit/retrofit.dart';

import '../../../../core/networking/api_constants.dart';
import '../model/login/login_request.dart';
import '../model/login/login_response.dart';

part 'auth_data_sources.g.dart';

@lazySingleton
@RestApi()
abstract class AuthDataSources {
  @factoryMethod
  factory AuthDataSources(Dio dio) {
    return _AuthDataSources(dio, baseUrl: ApiConstants.baseUrl);
  }

  @POST(ApiConstants.loginEndpoint)
  Future<BaseResponse<LoginResponse>> login(@Body() LoginRequest loginRequest);
}
