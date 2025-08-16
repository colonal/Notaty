part of 'login_cubit.dart';

abstract class LoginState {
  const LoginState();
}

class LoginInitial extends LoginState {}

class LoginLoading extends LoginState {}

class LoginSuccess extends LoginState {
  final LoginResponse response;

  const LoginSuccess(this.response);
}

class LoginFailure extends LoginState {
  final String message;

  const LoginFailure(this.message);
}
