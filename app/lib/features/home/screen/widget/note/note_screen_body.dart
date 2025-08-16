import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../data/model/notes/note.dart';
import '../../../logic/notes_cubit.dart';

class NoteScreenBody extends StatefulWidget {
  final Note? note;
  const NoteScreenBody({this.note, super.key});

  @override
  State<NoteScreenBody> createState() => _NoteScreenBodyState();
}

class _NoteScreenBodyState extends State<NoteScreenBody> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  late TextEditingController title, content;
  AutovalidateMode autovalidateMode = AutovalidateMode.disabled;
  bool obscureText = true;

  @override
  void initState() {
    super.initState();
    title = TextEditingController(text: widget.note?.title ?? '');
    content = TextEditingController(text: widget.note?.content ?? '');
  }

  @override
  void didUpdateWidget(NoteScreenBody oldWidget) {
    if (widget.note != oldWidget.note) {
      title.text = widget.note?.title ?? '';
      content.text = widget.note?.content ?? '';
    }
    super.didUpdateWidget(oldWidget);
  }

  @override
  void dispose() {
    title.dispose();
    content.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: Form(
        key: _formKey,
        autovalidateMode: autovalidateMode,
        child: Column(
          children: [
            const SizedBox(height: 25),
            TextFormField(
              controller: title,
              decoration: InputDecoration(
                hintText: 'note.body.form.title.hint'.tr(),
                hintStyle: TextStyle(color: theme.hintColor),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'note.body.form.title.validation.required'.tr();
                }

                return null;
              },
              onSaved: (newValue) {
                title.text = newValue ?? '';
              },
            ),
            const SizedBox(height: 25),
            TextFormField(
              controller: content,
              keyboardType: TextInputType.multiline,
              maxLines: 5,
              decoration: InputDecoration(
                hintText: 'note.body.form.content.hint'.tr(),
                hintStyle: TextStyle(color: theme.hintColor),
              ),

              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'note.body.form.content.validation.required'.tr();
                }

                return null;
              },
              onSaved: (newValue) {
                content.text = newValue ?? '';
              },
            ),
            const SizedBox(height: 25),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState?.save();
                    if (widget.note == null) {
                      context.read<NotesCubit>().createNote(
                        Note.create(title: title.text, content: content.text),
                      );
                    } else {
                      context.read<NotesCubit>().updateNote(
                        widget.note!.copyWith(
                          title: title.text,
                          content: content.text,
                        ),
                      );
                    }
                  } else {
                    autovalidateMode = AutovalidateMode.always;
                    setState(() {});
                  }
                },
                child: Text(
                  widget.note == null
                      ? 'note.body.button_new'.tr()
                      : 'note.body.button_edit'.tr(),
                  style: TextStyle(color: theme.colorScheme.onPrimary),
                ).tr(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
