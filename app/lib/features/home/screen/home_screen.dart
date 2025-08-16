import 'package:Notaty/core/di/di_setup.dart';
import 'package:Notaty/features/home/logic/notes_cubit.dart';
import 'package:Notaty/features/home/screen/note_screen.dart';
import 'package:easy_localization/easy_localization.dart';
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
            floatingActionButton: FloatingActionButton(
              onPressed: () {
                Navigator.pushNamed(
                  context,
                  NoteScreen.routeName,
                  arguments: null,
                ).then((value) {
                  if (value == true && context.mounted) {
                    context.read<NotesCubit>().fetchNotes();
                  }
                });
              },
              tooltip: 'home.floating_action_button.tooltip'.tr(),
              child: Icon(Icons.add),
            ),
          );
        },
      ),
    );
  }
}
