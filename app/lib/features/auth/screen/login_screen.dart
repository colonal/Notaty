import 'package:Notaty/core/di/di_setup.dart';
import 'package:Notaty/features/auth/screen/widget/login/login_screen_body.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../logic/login/login_cubit.dart';
import 'widget/login/login_screen_bloc_consumer.dart';

class LoginScreen extends StatelessWidget {
  static const String routeName = '/login';
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<LoginCubit>(),
      child: LoginScreenBlocConsumer(
        child: Scaffold(body: SafeArea(child: LoginScreenBody())),
      ),
    );
  }
}
