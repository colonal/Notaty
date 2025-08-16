import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:injectable/injectable.dart';

@singleton
class SecureStorage {
  final FlutterSecureStorage _storage;

  SecureStorage()
    : _storage = const FlutterSecureStorage(
        aOptions: _androidOptions,
        iOptions: _iOSOptions,
      );

  // Android-specific: you can customize the encryption
  static const AndroidOptions _androidOptions = AndroidOptions(
    encryptedSharedPreferences: true,
  );

  // iOS-specific: you can customize the accessibility
  static const IOSOptions _iOSOptions = IOSOptions(
    accessibility: KeychainAccessibility.first_unlock,
  );

  // Write value
  Future<void> write({required String key, required String value}) async {
    await _storage.write(key: key, value: value);
  }

  // Read value
  Future<String?> read({required String key}) async {
    return await _storage.read(key: key);
  }

  // Delete value
  Future<void> delete({required String key}) async {
    await _storage.delete(key: key);
  }

  // Delete all values
  Future<void> deleteAll() async {
    await _storage.deleteAll();
  }

  // Check if key exists
  Future<bool> containsKey({required String key}) async {
    return await _storage.containsKey(key: key);
  }

  // Get all values
  Future<Map<String, String>> readAll() async {
    return await _storage.readAll();
  }
}
