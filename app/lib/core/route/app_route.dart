import 'package:flutter/material.dart';

import '../../features/home/screen/home_screen.dart';

class AppRoute {
  // Initial route for the application
  static String initialRoute() => HomePage.routeName;

  /// Generates routes for the application.
  static Route<dynamic>? onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case HomePage.routeName:
        return MaterialPageRoute(builder: (_) => HomePage());
    }

    return null; // Placeholder for actual route generation logic
  }
}
