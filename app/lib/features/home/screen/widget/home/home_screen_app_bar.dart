import 'package:Notaty/features/home/logic/notes_cubit.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:pull_down_button/pull_down_button.dart';
import 'package:skeletonizer/skeletonizer.dart';

class HomeScreenAppBar extends StatelessWidget implements PreferredSizeWidget {
  const HomeScreenAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text('home.app_bar.title').tr(),
      actions: [
        BlocBuilder<NotesCubit, NotesState>(
          buildWhen: (previous, current) =>
              current is GetUserDataSuccess ||
              current is GetUserDataFailure ||
              current is GetUserDataLoading,
          builder: (context, state) {
            return _Profile(state: state);
          },
        ),
        SizedBox(width: 16), // Add some spacing between the avatar and the edge
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _Profile extends StatelessWidget {
  final NotesState state;
  const _Profile({required this.state});

  @override
  Widget build(BuildContext context) {
    return PullDownButton(
      itemBuilder: (context) => _item(context),
      buttonBuilder: (context, showMenu) {
        return InkWell(
          onTap: state is GetUserDataSuccess || state is GetUserDataFailure
              ? showMenu
              : null,
          customBorder: CircleBorder(),
          child: CircleAvatar(
            radius: 20,
            backgroundColor: Theme.of(context).colorScheme.inversePrimary,
            child: _buildWidget(context),
          ),
        );
      },
    );
  }

  Widget _buildWidget(BuildContext context) {
    if (state is GetUserDataFailure) {
      return Icon(Icons.error_outline, color: Colors.redAccent);
    } else if (state is GetUserDataSuccess) {
      final user = (state as GetUserDataSuccess).user;
      return Text(
        user.name.isNotEmpty ? user.name[0].toUpperCase() : '?',
        style: TextStyle(
          color: Theme.of(context).colorScheme.onInverseSurface,
          fontWeight: FontWeight.bold,
        ),
      );
    }
    return Skeletonizer.zone(enabled: true, child: Bone.circle(size: 35));
  }

  List<PullDownMenuEntry> _item(BuildContext context) {
    List<PullDownMenuEntry> items = [];
    if (state is GetUserDataSuccess) {
      final user = (state as GetUserDataSuccess).user;
      items.add(
        PullDownMenuItem(title: user.name, subtitle: user.email, onTap: null),
      );
    } else if (state is GetUserDataLoading) {
      items.add(
        PullDownMenuItem(
          title: 'home.app_bar.loading_message'.tr(),
          onTap: null,
        ),
      );
    } else if (state is GetUserDataFailure) {
      items.add(
        PullDownMenuItem(
          title: 'home.app_bar.error'.tr(),
          subtitle: 'home.app_bar.retry'.tr(),
          onTap: () {
            context.read<NotesCubit>().getUserData();
          },
        ),
      );
    }
    return [
      ...items,
      PullDownMenuItem(
        title: 'home.app_bar.logout'.tr(),
        onTap: () {
          context.read<NotesCubit>().logout();
        },
      ),
    ];
  }
}
