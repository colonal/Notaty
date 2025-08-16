import 'package:Notaty/core/di/di_setup.dart';
import 'package:Notaty/features/home/logic/notes_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'widget/note/note_screen_app_bar.dart';
import 'widget/note/note_screen_bloc_consumer.dart';

class NoteScreen extends StatelessWidget {
  static const String routeName = '/note';
  final String? noteId;
  const NoteScreen({required this.noteId, super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => getIt<NotesCubit>(),
      child: Scaffold(
        appBar: NoteScreenAppBar(noteId: noteId),
        body: NoteScreenBlocConsumer(noteId: noteId),
      ),
    );
  }
}
