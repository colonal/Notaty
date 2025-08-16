import 'package:Notaty/core/extension/string_extension.dart';
import 'package:Notaty/features/auth/logic/login/login_cubit.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LoginScreenForm extends StatefulWidget {
  const LoginScreenForm({super.key});

  @override
  State<LoginScreenForm> createState() => _LoginScreenFormState();
}

class _LoginScreenFormState extends State<LoginScreenForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  late String email, password;
  AutovalidateMode autovalidateMode = AutovalidateMode.disabled;
  bool obscureText = true;

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Form(
        key: _formKey,
        autovalidateMode: autovalidateMode,
        child: Column(
          children: [
            TextFormField(
              decoration: InputDecoration(
                hintText: 'auth.login.form.email.hint'.tr(),
                hintStyle: TextStyle(color: theme.hintColor),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'auth.login.form.email.validation.required'.tr();
                }
                // Simple email format check
                if (!value.isValidEmail()) {
                  return 'auth.login.form.email.validation.invalid'.tr();
                }
                return null;
              },
              onSaved: (newValue) {
                email = newValue ?? '';
              },
            ),
            const SizedBox(height: 15),
            StatefulBuilder(
              builder: (context, state) {
                return TextFormField(
                  decoration: InputDecoration(
                    hintText: 'auth.login.form.password.hint'.tr(),
                    hintStyle: TextStyle(color: theme.hintColor),
                    suffixIcon: IconButton(
                      icon: Icon(
                        obscureText ? Icons.visibility : Icons.visibility_off,
                        color: theme.hintColor,
                      ),
                      onPressed: () {
                        state(() {
                          obscureText = !obscureText;
                        });
                      },
                    ),
                  ),
                  obscureText: obscureText,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'auth.login.form.password.validation.required'
                          .tr();
                    } else if (!value.isValidPassword()) {
                      return 'auth.login.form.password.validation.min_length'
                          .tr();
                    }
                    return null;
                  },
                  onSaved: (newValue) {
                    password = newValue ?? '';
                  },
                );
              },
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState?.save();
                    context.read<LoginCubit>().login(email, password);
                  } else {
                    autovalidateMode = AutovalidateMode.always;
                    setState(() {});
                  }
                },
                child: Text('Login'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
