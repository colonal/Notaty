import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';

import '../../features/home/screen/home_screen.dart';

@singleton
/// AppRoute class handles the routing for the application.
class AppRoute {
  /// Initial route for the application
  String initialRoute() => HomePage.routeName;

  /// Generates routes for the application.
  Route<dynamic>? onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case HomePage.routeName:
        return MaterialPageRoute(builder: (_) => HomePage());
    }

    return null; // Placeholder for actual route generation logic
  }
}
