// dart format width=80
// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:dio/dio.dart' as _i361;
import 'package:get_it/get_it.dart' as _i174;
import 'package:injectable/injectable.dart' as _i526;
import 'package:Notaty/core/networking/dio_factory.dart' as _i553;
import 'package:Notaty/core/route/app_route.dart' as _i902;
import 'package:Notaty/features/auth/data/data_sources/auth_data_sources.dart'
    as _i166;
import 'package:Notaty/features/auth/data/repositories/auth_repositories.dart'
    as _i570;
import 'package:Notaty/features/auth/logic/login/login_cubit.dart' as _i796;

extension GetItInjectableX on _i174.GetIt {
  // initializes the registration of main-scope dependencies inside of GetIt
  _i174.GetIt init({
    String? environment,
    _i526.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i526.GetItHelper(this, environment, environmentFilter);
    final dioModule = _$DioModule();
    gh.singleton<_i553.DioFactory>(() => _i553.DioFactory());
    gh.singleton<_i902.AppRoute>(() => _i902.AppRoute());
    gh.singleton<_i361.Dio>(() => dioModule.dio(gh<_i553.DioFactory>()));
    gh.lazySingleton<_i166.AuthDataSources>(
      () => _i166.AuthDataSources.new(gh<_i361.Dio>()),
    );
    gh.lazySingleton<_i570.AuthRepositories>(
      () =>
          _i570.AuthRepositories(authDataSources: gh<_i166.AuthDataSources>()),
    );
    gh.factory<_i796.LoginCubit>(
      () => _i796.LoginCubit(repositories: gh<_i570.AuthRepositories>()),
    );
    return this;
  }
}

class _$DioModule extends _i553.DioModule {}
