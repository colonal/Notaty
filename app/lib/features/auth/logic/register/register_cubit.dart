import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/networking/api_result.dart';
import '../../data/model/register/register_request.dart';
import '../../data/model/register/register_response.dart';
import '../../data/repositories/auth_repositories.dart';

part 'register_state.dart';

@injectable
class RegisterCubit extends Cubit<RegisterState> {
  final AuthRepositories _repositories;

  RegisterCubit({required AuthRepositories repositories})
    : _repositories = repositories,
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
        emit(RegisterSuccess(response));
      },
      failure: (error) {
        emit(RegisterFailure(error.apiErrorModel.message ?? ''));
      },
    );
  }
}
