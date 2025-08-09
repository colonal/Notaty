import 'package:Notaty/core/di/di_setup.dart';
import 'package:Notaty/core/enum/localization.dart';
import 'package:Notaty/core/route/app_route.dart';
import 'package:Notaty/core/services/user_services.dart';
import 'package:Notaty/core/theming/app_theme.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize dependency injection
  configureDependencies();

  // Initialize localization
  await EasyLocalization.ensureInitialized();

  // Initialize the app route
  await getIt<AppRoute>().init(getIt<UserServices>().isAuthenticated);

  runApp(
    EasyLocalization(
      supportedLocales: Localization.values.map((e) => e.locale).toList(),
      path: 'assets/translations',
      startLocale: Localization.en.locale,
      fallbackLocale: Localization.en.locale,
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'app_name'.tr(),
      themeMode: ThemeMode.dark,
      theme: AppTheme.dark,
      localizationsDelegates: context.localizationDelegates,
      supportedLocales: context.supportedLocales,
      locale: context.locale,
      navigatorKey: getIt<AppRoute>().navigatorKey,
      initialRoute: getIt<AppRoute>().initialRoute(),
      onGenerateRoute: getIt<AppRoute>().onGenerateRoute,
    );
  }
}
