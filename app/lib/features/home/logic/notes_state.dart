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

class CreateNoteLoading extends NotesState {}

class CreateNoteSuccess extends NotesState {
  final Note note;

  CreateNoteSuccess({required this.note});
}

class CreateNoteFailure extends NotesState {
  final String message;

  CreateNoteFailure({required this.message});
}

class UpdateNoteLoading extends NotesState {
  final Note note;
  UpdateNoteLoading({required this.note});
}

class UpdateNoteSuccess extends NotesState {
  final Note note;

  UpdateNoteSuccess({required this.note});
}

class UpdateNoteFailure extends NotesState {
  final String message;
  final Note note;

  UpdateNoteFailure({required this.message, required this.note});
}

class GetNoteByIdLoading extends NotesState {}

class GetNoteByIdSuccess extends NotesState {
  final Note note;

  GetNoteByIdSuccess({required this.note});
}

class GetNoteByIdFailure extends NotesState {
  final String message;

  GetNoteByIdFailure({required this.message});
}

class DeleteNoteByIdSuccess extends NotesState {}

class DeleteNoteByIdFailure extends NotesState {
  final String message;

  DeleteNoteByIdFailure({required this.message});
}
