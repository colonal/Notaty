import 'package:Notaty/features/home/screen/note_screen.dart';
import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';

import '../../features/auth/screen/login_screen.dart';
import '../../features/auth/screen/register_screen.dart';
import '../../features/home/screen/home_screen.dart';

@singleton
/// AppRoute class handles the routing for the application.
class AppRoute {
  final navigatorKey = GlobalKey<NavigatorState>();

  /// Initial route for the application
  String? _initialRoute;

  /// Initializes the initial route based on the authentication state.
  /// If a token exists in secure storage, the initial route is set to HomePage.
  Future<void> init(Future<bool> Function() isAuthCallBack) async {
    final bool isAuth = await isAuthCallBack();
    if (isAuth) {
      _initialRoute = HomePage.routeName;
    } else {
      _initialRoute = LoginScreen.routeName;
    }
  }

  /// Initial route for the application
  String initialRoute() {
    if (_initialRoute == null) {
      throw Exception('Initial route is not set. Call init() first.');
    }
    return _initialRoute!;
  }

  /// Generates routes for the application.
  Route<dynamic>? onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case HomePage.routeName:
        return MaterialPageRoute(builder: (_) => const HomePage());
      case LoginScreen.routeName:
        return MaterialPageRoute(builder: (_) => const LoginScreen());
      case RegisterScreen.routeName:
        return MaterialPageRoute(builder: (_) => const RegisterScreen());
      case NoteScreen.routeName:
        return MaterialPageRoute(
          builder: (_) => NoteScreen(noteId: settings.arguments as String?),
        );
    }

    return null; // Placeholder for actual route generation logic
  }

  void logOut() {
    navigatorKey.currentState?.pushNamedAndRemoveUntil(
      LoginScreen.routeName,
      (Route<dynamic> route) => false,
    );
  }
}
