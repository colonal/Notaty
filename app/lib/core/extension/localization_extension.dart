import 'package:Notaty/core/enum/localization.dart';
import 'package:flutter/widgets.dart';

extension LocalesExtension on Localization {
  Locale get locale => Locale(code.toLowerCase());
}
