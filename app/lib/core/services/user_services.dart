import 'package:Notaty/core/constant/storage_constant.dart';
import 'package:Notaty/core/model/user.dart';
import 'package:Notaty/core/route/app_route.dart';
import 'package:Notaty/core/services/secure_storage.dart';
import 'package:injectable/injectable.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

@singleton
class UserServices {
  final SecureStorage _secureStorage;
  final AppRoute _appRoute;

  UserServices(SecureStorage secureStorage, AppRoute appRoute)
    : _secureStorage = secureStorage,
      _appRoute = appRoute;

  /// Get the token from the storage
  Future<String?> getToken() async {
    final token = await _secureStorage.read(key: StorageConstant.token);
    return token;
  }

  /// Check if the user is authenticated
  Future<bool> isAuthenticated() async {
    final token = await getToken();
    return token != null && token.isNotEmpty && !JwtDecoder.isExpired(token);
  }

  /// Login the user with a token
  Future<void> login(String token) async {
    // Store the token in secure storage
    await _secureStorage.write(key: StorageConstant.token, value: token);
  }

  /// Get the user information from the token
  Future<User?> getUser() async {
    final token = await getToken();
    if (token == null || token.isEmpty) {
      throw Exception('Token not found');
    }

    return User.fromJson(JwtDecoder.decode(token));
  }

  /// Logout the user by removing the token
  Future<void> logout() async {
    // Remove the token from secure storage
    await _secureStorage.delete(key: StorageConstant.token);
    // Navigate to the login screen
    _appRoute.logOut();
  }
}
