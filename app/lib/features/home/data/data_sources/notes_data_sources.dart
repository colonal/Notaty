import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:retrofit/retrofit.dart';

import '../../../../core/model/base_response.dart';
import '../../../../core/networking/api_constants.dart';
import '../model/notes/note.dart';

part 'notes_data_sources.g.dart';

@lazySingleton
@RestApi(baseUrl: ApiConstants.baseUrl)
abstract class NotesDataSources {
  @factoryMethod
  factory NotesDataSources(Dio dio) =>
      _NotesDataSources(dio, baseUrl: ApiConstants.baseUrl);

  @GET(ApiConstants.notesEndpoint)
  Future<BaseResponse<List<Note>>> notes();

  @DELETE("${ApiConstants.notesEndpoint}/{noteId}")
  Future<BaseResponse> deleteNote(@Path() String noteId);
}
