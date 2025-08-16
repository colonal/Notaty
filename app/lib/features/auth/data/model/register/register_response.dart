import '../../../../../core/model/user.dart';

class RegisterResponse {
  final String token;
  final User user;

  RegisterResponse({required this.token, required this.user});

  factory RegisterResponse.fromJson(Map<String, dynamic> json) {
    return RegisterResponse(
      token: json['token'],
      user: User.fromJson(json['user']),
    );
  }
}
