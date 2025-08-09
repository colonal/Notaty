import 'package:Notaty/core/di/di_setup.dart';
import 'package:Notaty/features/home/logic/notes_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'widget/home/home_screen_app_bar.dart';
import 'widget/home/home_screen_bloc_consumer.dart';

class HomePage extends StatelessWidget {
  static const String routeName = '/home';
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider<NotesCubit>(
      create: (context) => getIt<NotesCubit>()
        ..fetchNotes()
        ..getUserData(),
      child: BlocBuilder<NotesCubit, NotesState>(
        builder: (context, state) {
          return Scaffold(
            appBar: HomeScreenAppBar(),
            body: HomeScreenBlocConsumer(),
          );
        },
      ),
    );
  }
}
