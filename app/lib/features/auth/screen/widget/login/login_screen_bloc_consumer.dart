import 'package:Notaty/features/auth/logic/login/login_cubit.dart';
import 'package:Notaty/features/home/screen/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';

import '../../../../../core/widget/custom_snack_bar.dart';

class LoginScreenBlocConsumer extends StatelessWidget {
  final Widget child;
  const LoginScreenBlocConsumer({required this.child, super.key});

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<LoginCubit, LoginState>(
      listener: (context, state) {
        if (state is LoginSuccess) {
          Navigator.pushNamedAndRemoveUntil(
            context,
            HomePage.routeName,
            (route) => false,
          );
        } else if (state is LoginFailure) {
          // Show error message
          CustomSnackBar.error(context, state.message);
        }
      },
      builder: (context, state) {
        return ModalProgressHUD(
          inAsyncCall: state is LoginLoading,
          child: child,
        );
      },
    );
  }
}
