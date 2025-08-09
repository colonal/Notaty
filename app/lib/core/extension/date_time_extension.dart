import 'package:timeago/timeago.dart' as timeago;

extension DateTimeExtension on DateTime? {
  String toTimeAgo() {
    if (this == null) return '-';
    return timeago.format(this!);
  }
}
