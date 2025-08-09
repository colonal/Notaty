part of 'notes_cubit.dart';

abstract class NotesState {}

class NotesInitial extends NotesState {}

class FetchNotesLoading extends NotesState {}

class FetchNotesSuccess extends NotesState {
  final List<Note> notes;

  FetchNotesSuccess({required this.notes});
}

class FetchNotesFailure extends NotesState {
  final String message;

  FetchNotesFailure({required this.message});
}

class NotesLoggedOut extends NotesState {}

class GetUserDataLoading extends NotesState {}

class GetUserDataSuccess extends NotesState {
  final User user;

  GetUserDataSuccess({required this.user});
}

class GetUserDataFailure extends NotesState {
  final String message;

  GetUserDataFailure({required this.message});
}

class DeleteNoteSuccess extends NotesState {
  final int index;
  DeleteNoteSuccess({required this.index});
}

class DeleteNoteFailure extends NotesState {
  final String message;
  final int index;
  final Note note;

  DeleteNoteFailure({
    required this.message,
    required this.index,
    required this.note,
  });
}
