import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';

import '../../../../../core/widget/custom_snack_bar.dart';
import '../../../../home/screen/home_screen.dart';
import '../../../logic/register/register_cubit.dart';

class RegisterScreenBlocConsumer extends StatelessWidget {
  final Widget child;
  const RegisterScreenBlocConsumer({required this.child, super.key});

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<RegisterCubit, RegisterState>(
      listener: (context, state) {
        if (state is RegisterSuccess) {
          Navigator.pushNamedAndRemoveUntil(
            context,
            HomePage.routeName,
            (route) => false,
          );
        } else if (state is RegisterFailure) {
          CustomSnackBar.error(context, state.message);
        }
      },
      builder: (context, state) {
        return ModalProgressHUD(
          inAsyncCall: state is RegisterLoading,
          child: child,
        );
      },
    );
  }
}
