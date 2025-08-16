import 'package:equatable/equatable.dart';

class Note extends Equatable {
  final String? id;
  final String title;
  final String content;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final String? userId;

  const Note({
    required this.id,
    required this.title,
    required this.content,
    required this.createdAt,
    required this.updatedAt,
    required this.userId,
  });

  factory Note.fromJson(Map<String, dynamic> json) {
    return Note(
      id: json['id'] as String?,
      title: json['title'] as String,
      content: json['content'] as String,
      createdAt: DateTime.tryParse(json['createdAt'] as String? ?? ''),
      updatedAt: DateTime.tryParse(json['updatedAt'] as String? ?? ''),
      userId: json['userId'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {'title': title, 'content': content};
  }

  factory Note.demo() {
    return Note(
      id: 'demo-id',
      title: 'Demo Note',
      content: 'This is a demo note content.',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      userId: 'demo-user-id',
    );
  }

  factory Note.empty() {
    return Note(
      id: '',
      title: '',
      content: '',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      userId: '',
    );
  }

  factory Note.create({required String title, required String content}) {
    return Note(
      id: null,
      title: title,
      content: content,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      userId: null,
    );
  }

  Note copyWith({String? title, String? content}) {
    return Note(
      id: id,
      title: title ?? this.title,
      content: content ?? this.content,
      createdAt: createdAt,
      updatedAt: updatedAt,
      userId: userId,
    );
  }

  @override
  List<Object?> get props => [id];
}
