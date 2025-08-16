import 'package:Notaty/features/home/data/model/notes/note.dart';

class Notes {
  final List<Note> notes;

  Notes({required this.notes});

  factory Notes.fromJson(List<dynamic> json) {
    return Notes(
      notes: json.map((e) => Note.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }

  Map<String, dynamic> toJson() => {
    'notes': notes.map((e) => e.toJson()).toList(),
  };
}
