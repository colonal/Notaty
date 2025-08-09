import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../logic/notes_cubit.dart';

class HomeScreenBodyNoteFailure extends StatelessWidget {
  final String message;
  const HomeScreenBodyNoteFailure(this.message, {super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return RefreshIndicator.adaptive(
          onRefresh: () => context.read<NotesCubit>().fetchNotes(),
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: SizedBox(
              width: constraints.maxWidth,
              height: constraints.maxHeight,
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(message),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () => context.read<NotesCubit>().fetchNotes(),
                      child: Text('home.notes.retry').tr(),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
