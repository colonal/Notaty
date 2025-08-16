import 'package:Notaty/core/networking/api_result.dart';
import 'package:Notaty/core/services/user_services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';

import '../../data/model/login/login_request.dart';
import '../../data/model/login/login_response.dart';
import '../../data/repositories/auth_repositories.dart';

part 'login_state.dart';

@injectable
class LoginCubit extends Cubit<LoginState> {
  final AuthRepositories _repositories;
  final UserServices _userServices;

  LoginCubit({
    required AuthRepositories repositories,
    required UserServices userServices,
  }) : _repositories = repositories,
       _userServices = userServices,
       super(LoginInitial());

  void login(String email, String password) async {
    emit(LoginLoading());
    final loginRequest = LoginRequest(email: email.trim(), password: password);
    final result = await _repositories.login(loginRequest);

    result.when(
      success: (response) {
        _userServices.login(response.token);
        emit(LoginSuccess(response));
      },
      failure: (error) {
        emit(LoginFailure(error.apiErrorModel.message ?? ''));
      },
    );
  }
}
