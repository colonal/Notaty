import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/networking/api_result.dart';
import '../../../../core/services/user_services.dart';
import '../../data/model/register/register_request.dart';
import '../../data/model/register/register_response.dart';
import '../../data/repositories/auth_repositories.dart';

part 'register_state.dart';

@injectable
class RegisterCubit extends Cubit<RegisterState> {
  final AuthRepositories _repositories;
  final UserServices _userServices;

  RegisterCubit({
    required AuthRepositories repositories,
    required UserServices userServices,
  }) : _repositories = repositories,
       _userServices = userServices,
       super(RegisterInitial());

  void register(String name, String email, String password) async {
    emit(RegisterLoading());

    final registerRequest = RegisterRequest(
      name: name.trim(),
      email: email.trim(),
      password: password,
    );

    final result = await _repositories.register(registerRequest);

    result.when(
      success: (response) {
        _userServices.login(response.token);
        emit(RegisterSuccess(response));
      },
      failure: (error) {
        emit(RegisterFailure(error.apiErrorModel.message ?? ''));
      },
    );
  }
}
