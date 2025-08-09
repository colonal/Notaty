import 'package:retrofit/dio.dart';

class TypedExtrasOptions extends TypedExtras {
  final bool includeToken;
  const TypedExtrasOptions({this.includeToken = true});

  factory TypedExtrasOptions.fromMap(Map<String, dynamic> map) {
    return TypedExtrasOptions(includeToken: map['includeToken'] ?? true);
  }
}
