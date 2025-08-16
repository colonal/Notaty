import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../logic/notes_cubit.dart';

class NoteScreenAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String? noteId;
  const NoteScreenAppBar({this.noteId, super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(
        noteId == null ? 'note.app_bar.title_new' : 'note.app_bar.title_edit',
      ).tr(),
      actions: [
        if (noteId != null)
          IconButton(
            icon: const Icon(Icons.delete),
            onPressed: () {
              // Implement search functionality
              context.read<NotesCubit>().deleteNoteById(noteId!);
            },
          ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
