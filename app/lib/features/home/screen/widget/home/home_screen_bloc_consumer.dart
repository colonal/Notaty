import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../../../logic/notes_cubit.dart';
import 'home_screen_body.dart';
import 'home_screen_body_note_failure.dart';

class HomeScreenBlocConsumer extends StatelessWidget {
  const HomeScreenBlocConsumer({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<NotesCubit, NotesState>(
      buildWhen: (previous, current) =>
          current is FetchNotesSuccess ||
          current is FetchNotesFailure ||
          current is FetchNotesLoading,
      builder: (context, state) {
        if (state is FetchNotesSuccess) {
          return HomeScreenBody(notes: state.notes);
        } else if (state is FetchNotesFailure) {
          return HomeScreenBodyNoteFailure(state.message);
        }

        return Skeletonizer(enabled: true, child: HomeScreenBody.loading());
      },
    );
  }
}
