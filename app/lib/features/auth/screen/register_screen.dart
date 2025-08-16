import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../core/di/di_setup.dart';
import '../logic/register/register_cubit.dart';
import 'widget/register/register_screen_bloc_consumer.dart';
import 'widget/register/register_screen_body.dart';

class RegisterScreen extends StatelessWidget {
  static const String routeName = '/register';
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<RegisterCubit>(),
      child: RegisterScreenBlocConsumer(
        child: Scaffold(body: SafeArea(child: RegisterScreenBody())),
      ),
    );
  }
}
