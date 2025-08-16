import 'package:freezed_annotation/freezed_annotation.dart';

part 'base_response.g.dart';

@JsonSerializable(genericArgumentFactories: true)
class BaseResponse<T> {
  @JsonKey(name: 'message')
  final String message;
  @JsonKey(name: 'success')
  final bool success;
  @JsonKey(name: 'data')
  final T? data;

  BaseResponse({
    required this.message,
    required this.success,
    required this.data,
  });

  factory BaseResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Object? json) fromJsonT,
  ) => _$BaseResponseFromJson<T>(json, fromJsonT);

  Map<String, dynamic> toJson(Object? Function(T value) toJsonT) =>
      _$BaseResponseToJson<T>(this, toJsonT);
}
