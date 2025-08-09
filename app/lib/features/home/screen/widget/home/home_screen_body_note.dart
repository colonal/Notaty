import 'package:Notaty/core/extension/date_time_extension.dart';
import 'package:Notaty/features/home/data/model/notes/note.dart';
import 'package:flutter/material.dart';

class HomeScreenBodyNote extends StatelessWidget {
  final Note note;
  final Future<bool> Function()? onEdit;
  final Future<bool> Function()? onDelete;
  const HomeScreenBodyNote({
    required this.note,
    this.onEdit,
    this.onDelete,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    return Dismissible(
      key: Key(note.id!),
      background: Container(
        color: theme.colorScheme.primary,
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.only(left: 20),
        child: Icon(Icons.edit, color: theme.colorScheme.onPrimary),
      ),
      secondaryBackground: Container(
        color: theme.colorScheme.error,
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        child: Icon(Icons.delete, color: theme.colorScheme.onError),
      ),
      confirmDismiss: (direction) async {
        if (direction == DismissDirection.startToEnd) {
          return onEdit?.call() ?? false;
        } else {
          return onDelete?.call() ?? false;
        }
      },
      child: ListTile(
        onTap: () {
          onEdit?.call();
        },
        title: Text(
          note.title,
          style: theme.textTheme.headlineSmall,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: Text(
          note.content,
          style: theme.textTheme.labelMedium?.copyWith(
            color: theme.colorScheme.onSurface.withValues(alpha: 0.6),
          ),
          maxLines: 3,
          overflow: TextOverflow.ellipsis,
        ),
        trailing: Text(note.updatedAt.toTimeAgo()),
      ),
    );
  }
}
