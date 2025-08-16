import 'package:Notaty/core/widget/custom_snack_bar.dart';
import 'package:Notaty/features/home/screen/widget/note/note_screen_body.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';

import '../../../data/model/notes/note.dart';
import '../../../logic/notes_cubit.dart';

class NoteScreenBlocConsumer extends StatefulWidget {
  final String? noteId;
  const NoteScreenBlocConsumer({this.noteId, super.key});

  @override
  State<NoteScreenBlocConsumer> createState() => _NoteScreenBlocConsumerState();
}

class _NoteScreenBlocConsumerState extends State<NoteScreenBlocConsumer> {
  @override
  void initState() {
    super.initState();
    if (widget.noteId != null) {
      context.read<NotesCubit>().getNoteById(widget.noteId!);
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<NotesCubit, NotesState>(
      buildWhen: (previous, current) =>
          current is! DeleteNoteByIdSuccess ||
          current is! DeleteNoteByIdFailure,
      listener: (context, state) {
        if (state is CreateNoteSuccess) {
          Navigator.pop(context, true);
          CustomSnackBar.success(context, 'note.body.success_create'.tr());
        } else if (state is UpdateNoteSuccess) {
          Navigator.pop(context, true);
          CustomSnackBar.success(context, 'note.body.success_update'.tr());
        } else if (state is CreateNoteFailure) {
          CustomSnackBar.error(context, state.message);
        } else if (state is UpdateNoteFailure) {
          CustomSnackBar.error(context, state.message);
        } else if (state is GetNoteByIdFailure) {
          CustomSnackBar.error(context, state.message);
        } else if (state is DeleteNoteByIdSuccess) {
          CustomSnackBar.success(context, 'note.body.success_deleted'.tr());
          Navigator.pop(context, true);
        } else if (state is DeleteNoteByIdFailure) {
          CustomSnackBar.error(context, state.message);
        }
      },
      builder: (context, state) {
        bool isLoading =
            state is CreateNoteLoading ||
            state is UpdateNoteLoading ||
            state is GetNoteByIdLoading;

        Note? currentNote;
        if (widget.noteId == null) {
          currentNote = null;
        } else if (state is GetNoteByIdSuccess) {
          currentNote = state.note;
        } else if (state is UpdateNoteSuccess) {
          currentNote = state.note;
        } else if (state is GetNoteByIdLoading) {
          currentNote = Note.empty();
        } else if (state is UpdateNoteLoading) {
          currentNote = state.note;
        } else if (state is UpdateNoteFailure) {
          currentNote = state.note;
        }

        if (state is GetNoteByIdFailure && widget.noteId != null) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(state.message, style: TextStyle(color: Colors.red)),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text('note.body.go_back'.tr()),
                ),
              ],
            ),
          );
        }

        return SizedBox(
          width: double.infinity,
          height: MediaQuery.of(context).size.height,
          child: ModalProgressHUD(
            inAsyncCall: isLoading,
            child: NoteScreenBody(note: currentNote),
          ),
        );
      },
    );
  }
}
