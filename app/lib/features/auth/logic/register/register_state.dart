part of 'register_cubit.dart';

abstract class RegisterState {
  const RegisterState();
}

class RegisterInitial extends RegisterState {}

class RegisterLoading extends RegisterState {}

class RegisterSuccess extends RegisterState {
  final RegisterResponse response;

  const RegisterSuccess(this.response);
}

class RegisterFailure extends RegisterState {
  final String message;

  const RegisterFailure(this.message);
}
