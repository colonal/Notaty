import 'package:Notaty/core/constant/environment.dart';

class ApiHeaders {
  static const String contentType = "Content-Type";
  static const String applicationJson = "application/json";
  static const String accept = "Accept";
}

class ApiConstants {
  static const String baseUrl = Environment.apiBaseUrl;
  static const String loginEndpoint = "/users/login";
  static const String registerEndpoint = "/users/register";
  static const String notesEndpoint = "/notes";
}
