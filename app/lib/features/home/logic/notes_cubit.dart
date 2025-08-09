import 'dart:developer';

import 'package:Notaty/core/model/user.dart';
import 'package:Notaty/core/networking/api_result.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';

import '../../../core/services/user_services.dart';
import '../data/model/notes/note.dart';
import '../data/repositories/notes_repositories.dart';

part 'notes_state.dart';

@injectable
class NotesCubit extends Cubit<NotesState> {
  final NotesRepositories _repository;
  final UserServices _userServices;
  NotesCubit({
    required NotesRepositories repository,
    required UserServices userServices,
  }) : _repository = repository,
       _userServices = userServices,
       super(NotesInitial());

  Future<void> fetchNotes() async {
    emit(FetchNotesLoading());
    final result = await _repository.fetchNotes();
    result.when(
      success: (notes) {
        emit(FetchNotesSuccess(notes: notes));
      },
      failure: (error) {
        emit(FetchNotesFailure(message: error.apiErrorModel.message ?? ''));
      },
    );
  }

  void getUserData() async {
    try {
      emit(GetUserDataLoading());
      final user = await _userServices.getUser();
      emit(GetUserDataSuccess(user: user!));
    } catch (_) {
      emit(GetUserDataFailure(message: ''));
    }
  }

  void logout() {
    _userServices.logout();
    emit(NotesLoggedOut());
  }

  Future<bool> deleteNote(int index, Note note) async {
    final result = await _repository.deleteNote(note);
    return result.when<bool>(
      success: (_) {
        log("Note deleted successfully: ${note.title}");
        emit(DeleteNoteSuccess(index: index));
        return true;
      },
      failure: (error) {
        log("Failed to delete note: ${error.apiErrorModel.message}");
        emit(
          DeleteNoteFailure(
            message: error.apiErrorModel.message ?? '',
            index: index,
            note: note,
          ),
        );
        return false;
      },
    );
  }
}
