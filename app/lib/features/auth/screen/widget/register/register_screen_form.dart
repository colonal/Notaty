import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../core/extension/string_extension.dart';
import '../../../logic/register/register_cubit.dart';

class RegisterScreenForm extends StatefulWidget {
  const RegisterScreenForm({super.key});

  @override
  State<RegisterScreenForm> createState() => _RegisterScreenFormState();
}

class _RegisterScreenFormState extends State<RegisterScreenForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  late String name, email, password, confirmPassword;
  AutovalidateMode autovalidateMode = AutovalidateMode.disabled;
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  String _currentPassword = '';

  void _onRegister() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState?.save();
      context.read<RegisterCubit>().register(name, email, password);
    } else {
      autovalidateMode = AutovalidateMode.always;
      setState(() {});
    }
  }

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
                hintText: 'auth.register.form.name.hint'.tr(),
                hintStyle: TextStyle(color: theme.hintColor),
                border: const OutlineInputBorder(),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'auth.register.form.name.validation.required'.tr();
                }
                return null;
              },
              onSaved: (newValue) {
                name = newValue ?? '';
              },
            ),
            const SizedBox(height: 16),
            TextFormField(
              decoration: InputDecoration(
                hintText: 'auth.register.form.email.hint'.tr(),
                hintStyle: TextStyle(color: theme.hintColor),
                border: const OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'auth.register.form.email.validation.required'.tr();
                }
                if (!value.isValidEmail()) {
                  return 'auth.register.form.email.validation.invalid'.tr();
                }
                return null;
              },
              onSaved: (newValue) {
                email = newValue ?? '';
              },
            ),
            const SizedBox(height: 16),
            StatefulBuilder(
              builder: (context, state) {
                return TextFormField(
                  decoration: InputDecoration(
                    hintText: 'auth.register.form.password.hint'.tr(),
                    hintStyle: TextStyle(color: theme.hintColor),
                    border: const OutlineInputBorder(),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword
                            ? Icons.visibility_off
                            : Icons.visibility,
                      ),
                      onPressed: () {
                        state(() {
                          _obscurePassword = !_obscurePassword;
                        });
                      },
                    ),
                  ),
                  obscureText: _obscurePassword,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'auth.register.form.password.validation.required'
                          .tr();
                    }
                    if (!value.isValidPassword()) {
                      return 'auth.register.form.password.validation.min_length'
                          .tr();
                    }
                    return null;
                  },
                  onChanged: (value) {
                    _currentPassword = value;
                  },
                  onSaved: (newValue) {
                    password = newValue ?? '';
                  },
                );
              },
            ),
            const SizedBox(height: 16),
            StatefulBuilder(
              builder: (context, state) {
                return TextFormField(
                  decoration: InputDecoration(
                    hintText: 'auth.register.form.confirm_password.hint'.tr(),
                    hintStyle: TextStyle(color: theme.hintColor),
                    border: const OutlineInputBorder(),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscureConfirmPassword
                            ? Icons.visibility_off
                            : Icons.visibility,
                      ),
                      onPressed: () {
                        state(() {
                          _obscureConfirmPassword = !_obscureConfirmPassword;
                        });
                      },
                    ),
                  ),
                  obscureText: _obscureConfirmPassword,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'auth.register.form.confirm_password.validation.required'
                          .tr();
                    }
                    if (value != _currentPassword) {
                      return 'auth.register.form.confirm_password.validation.mismatch'
                          .tr();
                    }
                    return null;
                  },
                  onSaved: (newValue) {
                    confirmPassword = newValue ?? '';
                  },
                );
              },
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: _onRegister,
                child: Text(
                  'auth.register.form.register_button',
                  style: const TextStyle(fontSize: 16),
                ).tr(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
