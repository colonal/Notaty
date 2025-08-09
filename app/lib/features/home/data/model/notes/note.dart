class Note {
  final String? id;
  final String title;
  final String content;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final String? userId;

  Note({
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
}
