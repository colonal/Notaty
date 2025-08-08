import 'package:animated_snack_bar/animated_snack_bar.dart';
import 'package:flutter/material.dart';

enum _CustomSnackBarType { success, error, warning, info }

class CustomSnackBar {
  /// Show a success snack bar
  static void success(BuildContext context, String message) {
    _show(context, message, _CustomSnackBarType.success);
  }

  /// Show an error snack bar
  static void error(BuildContext context, String message) {
    _show(context, message, _CustomSnackBarType.error);
  }

  /// Show a warning snack bar
  static void warning(BuildContext context, String message) {
    _show(context, message, _CustomSnackBarType.warning);
  }

  /// Show an info snack bar
  static void info(BuildContext context, String message) {
    _show(context, message, _CustomSnackBarType.info);
  }

  /// Remove all snack bars
  static void removeAll() {
    AnimatedSnackBar.removeAll();
  }

  static void _show(
    BuildContext context,
    String message,
    _CustomSnackBarType type,
  ) {
    AnimatedSnackBar? snackbar;
    ThemeData theme = Theme.of(context);
    snackbar = AnimatedSnackBar(
      duration: const Duration(seconds: 4),
      mobilePositionSettings: const MobilePositionSettings(topOnAppearance: 50),

      builder: ((context) {
        return LayoutBuilder(
          builder: (context, constraints) {
            return Dismissible(
              key: Key(message),
              onDismissed: (direction) {
                snackbar?.remove();
              },
              direction: DismissDirection.vertical,
              child: Container(
                width: constraints.maxWidth,
                padding: const EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 8,
                ),
                decoration: BoxDecoration(
                  color: _backgroundColor(type)?.withValues(alpha: 0.85),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    Icon(_iconData(type), color: Colors.white),
                    const SizedBox(width: 8),
                    Flexible(
                      child: Text(
                        message,
                        style: theme.textTheme.labelMedium?.copyWith(
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      }),
    );
    snackbar.show(context);
  }

  static Color? _backgroundColor(_CustomSnackBarType type) {
    switch (type) {
      case _CustomSnackBarType.info:
        return Color.fromRGBO(80, 147, 209, 1);

      case _CustomSnackBarType.error:
        return Color.fromRGBO(255, 0, 0, 1);

      case _CustomSnackBarType.success:
        return Color.fromRGBO(99, 142, 90, 1);

      case _CustomSnackBarType.warning:
        return Color.fromRGBO(255, 205, 0, 1);
    }
  }

  static IconData? _iconData(_CustomSnackBarType type) {
    switch (type) {
      case _CustomSnackBarType.info:
        return Icons.info_outline;

      case _CustomSnackBarType.error:
        return Icons.error_outline;

      case _CustomSnackBarType.success:
        return Icons.done;

      case _CustomSnackBarType.warning:
        return Icons.warning_amber_rounded;
    }
  }
}
