import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

import '../../../../../core/constant/app_assets.dart';
import 'login_screen_form.dart';

class LoginScreenBody extends StatelessWidget {
  const LoginScreenBody({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    return SingleChildScrollView(
      child: Column(
        children: [
          Image.asset(AppAssets.logo, height: 150, width: 150),
          const SizedBox(height: 20),
          Text('auth.login.title', style: theme.textTheme.titleLarge).tr(),
          const SizedBox(height: 10),
          Text('auth.login.subtitle', style: theme.textTheme.titleSmall).tr(),
          const SizedBox(height: 20),
          LoginScreenForm(),
          const SizedBox(height: 20),
          Text.rich(
            TextSpan(
              children: [
                TextSpan(
                  text: 'auth.login.dont_have_account'.tr(),
                  style: theme.textTheme.bodyMedium,
                ),
                const TextSpan(text: ' '),
                TextSpan(
                  text: 'auth.login.signUp'.tr(),
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            style: theme.textTheme.bodyMedium,
          ),
        ],
      ),
    );
  }
}
