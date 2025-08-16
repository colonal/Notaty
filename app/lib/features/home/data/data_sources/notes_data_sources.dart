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

  @POST(ApiConstants.notesEndpoint)
  Future<BaseResponse<Note>> createNote(@Body() Note note);

  @GET("${ApiConstants.notesEndpoint}/{noteId}")
  Future<BaseResponse<Note>> getNote(@Path() String noteId);

  @DELETE("${ApiConstants.notesEndpoint}/{noteId}")
  Future<BaseResponse> deleteNote(@Path() String noteId);

  @PUT("${ApiConstants.notesEndpoint}/{noteId}")
  Future<BaseResponse<Note>> updateNote(
    @Path() String noteId,
    @Body() Note note,
  );
}
