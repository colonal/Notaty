import 'package:Notaty/features/home/logic/notes_cubit.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../core/widget/custom_snack_bar.dart';
import '../../../data/model/notes/note.dart';
import '../../note_screen.dart';
import 'home_screen_body_note.dart';

class HomeScreenBody extends StatefulWidget {
  final List<Note> notes;
  const HomeScreenBody({required this.notes, super.key});

  factory HomeScreenBody.loading() {
    return HomeScreenBody(notes: List.generate(10, (index) => Note.demo()));
  }

  @override
  State<HomeScreenBody> createState() => _HomeScreenBodyState();
}

class _HomeScreenBodyState extends State<HomeScreenBody> {
  @override
  Widget build(BuildContext context) {
    return BlocConsumer<NotesCubit, NotesState>(
      listenWhen: (previous, current) =>
          current is DeleteNoteFailure || current is DeleteNoteSuccess,
      listener: (context, state) {
        if (state is DeleteNoteSuccess) {
          CustomSnackBar.success(context, 'home.notes.delete.success'.tr());
        } else if (state is DeleteNoteFailure) {
          CustomSnackBar.error(context, state.message);

          widget.notes.insert(state.index, state.note);
          setState(() {});
        }
      },
      builder: (context, state) {
        final cubit = context.read<NotesCubit>();
        return RefreshIndicator.adaptive(
          onRefresh: () => cubit.fetchNotes(),
          child: widget.notes.isEmpty ? _EmptyWidget() : _buildWidget(cubit),
        );
      },
    );
  }

  ListView _buildWidget(NotesCubit cubit) {
    return ListView.separated(
      itemCount: widget.notes.length,
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.symmetric(vertical: 10),
      separatorBuilder: (context, index) =>
          Divider(endIndent: 10, indent: 10, thickness: .5),
      itemBuilder: (context, index) {
        final note = widget.notes[index];
        return HomeScreenBodyNote(
          note: note,
          onDelete: () async {
            // Remove note locally first
            final removedNote = widget.notes.removeAt(index);
            setState(() {});

            // Call delete API
            final isDeleted = await cubit.deleteNote(index, removedNote);

            // If failed, Cubit will emit DeleteNoteFailure and restore in listener
            return isDeleted;
          },
          onEdit: () {
            Navigator.pushNamed(
              context,
              NoteScreen.routeName,
              arguments: note.id,
            ).then((value) {
              if (value == true) {
                // If the note was edited successfully, refresh the notes
                cubit.fetchNotes();
              }
            });
            return Future.value(false);
          },
        );
      },
    );
  }
}

class _EmptyWidget extends StatelessWidget {
  const _EmptyWidget();

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
                    Icon(
                      Icons.note_alt_outlined,
                      size: 80,
                      color: Colors.grey[400],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'home.notes.empty.title'.tr(),
                      style: Theme.of(context).textTheme.headlineSmall
                          ?.copyWith(
                            color: Colors.grey[600],
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'home.notes.empty.subtitle'.tr(),
                      style: Theme.of(
                        context,
                      ).textTheme.bodyMedium?.copyWith(color: Colors.grey[500]),
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
