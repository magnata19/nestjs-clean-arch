import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import UserInMemoryRepository from './database/in-memory/repositories/user-in-memory-repository';
import { BcryptjsHashProvider } from './provider/hash-provider/bcryptjs-hash.provider';
import { SignInUsecase } from '../application/usecases/signin.usecase';
import { UserRepository } from '../domain/repositories/user.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { SignUpUsecase } from '../application/usecases/signup.usecase';
import { GetUserUseCase } from '../application/usecases/getuser.usecase';
import { ListUsersUsecase } from '../application/usecases/listusers.usecase';
import { UpdateUserUsecase } from '../application/usecases/update-user.usecase';
import { UpdatePasswordUsecase } from '../application/usecases/update-password.usecase';
import { DeleteUserUsecase } from '../application/usecases/delete-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [UsersService, {
    provide: "UserRepository",
    useClass: UserInMemoryRepository
  },
    {
      provide: "HashProvider",
      useClass: BcryptjsHashProvider
    },
    {
      provide: SignUpUsecase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider
      ) => {
        return new SignUpUsecase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider']
    },
    {
      provide: SignInUsecase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider) => {
        return new SignInUsecase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider']
    },
    {
      provide: GetUserUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository']
    },
    {
      provide: ListUsersUsecase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository) => {
        return new ListUsersUsecase.UseCase(userRepository);
      },
      inject: ['UserRepository']
    },
    {
      provide: UpdateUserUsecase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository) => {
        return new UpdateUserUsecase.UseCase(userRepository);
      },
      inject: ['UserRepository']
    },
    {
      provide: UpdatePasswordUsecase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider) => {
        return new UpdatePasswordUsecase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider']
    },
    {
      provide: DeleteUserUsecase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository) => {
        return new DeleteUserUsecase.UseCase(userRepository);
      },
      inject: ['UserRepository']
    }
  ],
})
export class UsersModule { }
