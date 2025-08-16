import 'package:flutter/material.dart';

ThemeData darkTheme() {
  // --- Core palette ---------------------------------------------------------
  const primary = Color(0xFF1D4ED8);
  const onPrimary = Colors.white;
  const background = Color(0xFF0A0A0A);
  const onBackground = Color(0xFFFAFAFA);
  const surface = Color(0xFF0A0A0A);
  const onSurface = Color(0xFFFAFAFA);
  const secondary = Color(0xFF262626);
  const onSecondary = Color(0xFFFAFAFA);
  const error = Color(0xFF7F1D1D);
  const surfaceContainerHighest = Color(0xFF171717);
  final onError = onBackground;

  const outline = Color(0xFF262626);
  const ring = Color(0xFFD4D4D4);

  const chart2 = Color(0xFF2EB88A);

  // --- ColorScheme ----------------------------------------------------------
  const brightness = Brightness.dark;
  final scheme = ColorScheme(
    brightness: brightness,
    primary: primary,
    onPrimary: onPrimary,
    secondary: secondary,
    onSecondary: onSecondary,
    tertiary: chart2,
    onTertiary: onBackground,
    error: error,
    onError: onError,
    surface: surface,
    onSurface: onSurface,
    outline: outline,
    surfaceContainerHighest: surfaceContainerHighest,
    onSurfaceVariant: onBackground,
    inverseSurface: onBackground,
    onInverseSurface: background,
    inversePrimary: ring,
    shadow: Colors.black,
    surfaceTint: primary,
  );

  // --- ThemeData tweaks -----------------------------------------------------
  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: scheme.surface,
    appBarTheme: AppBarTheme(
      backgroundColor: scheme.surface,
      foregroundColor: scheme.onSurface,
      elevation: 0,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: scheme.primary,
        foregroundColor: scheme.onPrimary,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(8)),
        ),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: secondary,
      border: OutlineInputBorder(
        borderRadius: const BorderRadius.all(Radius.circular(8)),
        borderSide: BorderSide(color: outline),
      ),
    ),
  );
}
