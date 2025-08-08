import 'package:Notaty/core/networking/api_result.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';

import '../../data/model/login/login_request.dart';
import '../../data/model/login/login_response.dart';
import '../../data/repositories/auth_repositories.dart';

part 'login_state.dart';

@injectable
class LoginCubit extends Cubit<LoginState> {
  final AuthRepositories _repositories;

  LoginCubit({required AuthRepositories repositories})
    : _repositories = repositories,
      super(LoginInitial());

  void login(String email, String password) async {
    emit(LoginLoading());
    final loginRequest = LoginRequest(email: email.trim(), password: password);
    final result = await _repositories.login(loginRequest);

    result.when(
      success: (response) {
        emit(LoginSuccess(response));
      },
      failure: (error) {
        emit(LoginFailure(error.apiErrorModel.message ?? ''));
      },
    );
  }
}
