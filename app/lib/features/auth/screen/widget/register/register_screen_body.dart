import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

import '../../../../../core/constant/app_assets.dart';
import 'register_screen_form.dart';

class RegisterScreenBody extends StatelessWidget {
  const RegisterScreenBody({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    return SingleChildScrollView(
      child: Column(
        children: [
          Hero(tag: 'logo', child: Image.asset(AppAssets.logo, height: 150)),
          const SizedBox(height: 20),
          Text('auth.register.title', style: theme.textTheme.titleLarge).tr(),
          const SizedBox(height: 8),
          Text(
            'auth.register.subtitle',
            style: theme.textTheme.titleSmall,
          ).tr(),
          const SizedBox(height: 32),
          const RegisterScreenForm(),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'auth.register.already_have_account',
                style: theme.textTheme.bodyMedium,
              ).tr(),
              TextButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                child: Text(
                  'auth.register.signIn',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.bold,
                  ),
                ).tr(),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
