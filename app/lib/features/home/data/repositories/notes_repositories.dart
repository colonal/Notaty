import 'package:Notaty/core/networking/api_error_handler.dart';
import 'package:Notaty/core/networking/api_result.dart';
import 'package:Notaty/features/home/data/model/notes/note.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/model/base_response.dart';
import '../data_sources/notes_data_sources.dart';

@lazySingleton
class NotesRepositories {
  final NotesDataSources _notesDataSource;

  NotesRepositories(this._notesDataSource);

  Future<ApiResult<List<Note>>> fetchNotes() async {
    try {
      final response = await _notesDataSource.notes();
      return ApiResult.success(response.data!);
    } catch (error) {
      return ApiResult.failure(ErrorHandler.handle(error));
    }
  }

  Future<ApiResult<BaseResponse>> deleteNote(Note note) async {
    try {
      final response = await _notesDataSource.deleteNote(note.id!);
      return ApiResult.success(response);
    } catch (error) {
      return ApiResult.failure(ErrorHandler.handle(error));
    }
  }
}
