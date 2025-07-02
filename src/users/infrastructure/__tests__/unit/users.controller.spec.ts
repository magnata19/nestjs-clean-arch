import { UsersController } from '../../users.controller';
import { UserOutput } from '@/users/application/dtos/user-output';
import { SignUpUsecase } from '@/users/application/usecases/signup.usecase';
import { SignupDto } from '../../dtos/signup.dto';
import { SignInUsecase } from '@/users/application/usecases/signin.usecase';
import { SigninDto } from '../../dtos/signin.dto';
import { UpdateUserUsecase } from '@/users/application/usecases/update-user.usecase';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UpdatePasswordUsecase } from '@/users/application/usecases/update-password.usecase';
import { UpdatePasswordDto } from '../../dtos/updatepassword.dto';
import { DeleteUserUsecase } from '@/users/application/usecases/delete-user.usecase';
import { GetUserUseCase } from '@/users/application/usecases/getuser.usecase';
import { ListUsersUsecase } from '@/users/application/usecases/listusers.usecase';
import { ListUsersDto } from '../../dtos/listusers.dto';
import { SearchParams, SearchResult } from '@/shared/domain/repositories/searchable-repository-contract';

describe('UsersController unit tests', () => {
  let sut: UsersController;
  let id: string;
  let props: UserOutput;

  beforeEach(async () => {
    sut = new UsersController();
    id = '4833fac8-3461-4ca3-8303-d62017bd1002';
    props = {
      id,
      name: 'John Doe',
      email: 'a@a.com',
      password: 'securepassword',
      createdAt: new Date(),
    }
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user', async () => {
    const output: SignUpUsecase.Output = props;
    const signUpMock = {
      execute: jest.fn().mockReturnValue(Promise.resolve(props))
    }
    const input: SignupDto = {
      name: 'John Doe',
      email: 'a@a.com',
      password: 'securepassword'
    }

    sut['signupUseCase'] = signUpMock as any;


    const result = await sut.create(input)
    expect(output).toMatchObject(result)
    expect(signUpMock.execute).toHaveBeenCalledWith(input);
  })

  it('should authenticate a user', async () => {
    const output: SignInUsecase.Output = props;
    const signInMock = {
      execute: jest.fn().mockReturnValue(Promise.resolve(props))
    }
    const input: SigninDto = {
      email: 'a@a.com',
      password: 'securepassword'
    }

    sut['signinUseCase'] = signInMock as any;


    const result = await sut.login(input)
    expect(output).toMatchObject(result)
    expect(signInMock.execute).toHaveBeenCalledWith(input);
  })

  it('should update a user', async () => {
    const output: UpdateUserUsecase.Output = props;
    const updateUserMock = {
      execute: jest.fn().mockReturnValue(Promise.resolve(props))
    }
    const input: UpdateUserDto = {
      name: 'Davidson',
    }

    sut['updateUserUseCase'] = updateUserMock as any;


    const result = await sut.update(id, input)
    expect(output).toMatchObject(result)
    expect(updateUserMock.execute).toHaveBeenCalledWith({ id, ...input });
  })

  it('should update a user password', async () => {
    const output: UpdatePasswordUsecase.Output = props;
    const updatePasswordMock = {
      execute: jest.fn().mockReturnValue(Promise.resolve(props))
    }
    const input: UpdatePasswordDto = {
      password: 'newpassword',
      oldPassword: 'secure password'
    }

    sut['updatePasswordUseCase'] = updatePasswordMock as any;

    const result = await sut.updatePassword(id, input)
    expect(output).toMatchObject(result)
    expect(updatePasswordMock.execute).toHaveBeenCalledWith({ id, ...input });
  })

  it('should delete a user', async () => {
    const output = undefined;
    const deleteUserMock = {
      execute: jest.fn().mockReturnValue(Promise.resolve(props))
    }

    sut['deleteUserUseCase'] = deleteUserMock as any;

    const result = await sut.remove(id);
    expect(output).toStrictEqual(result)
    expect(deleteUserMock.execute).toHaveBeenCalledWith({ id });
  })

  it('should get a user', async () => {
    const output: GetUserUseCase.Output = props;
    const getUserMock = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    }

    sut['getUserUseCase'] = getUserMock as any;

    const result = await sut.findOne(id);
    expect(output).toStrictEqual(result)
    expect(getUserMock.execute).toHaveBeenCalledWith({ id });
  })

  it('should list users', async () => {
    const output: ListUsersUsecase.Output = {
      items: [props],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    }
    const listUsersUseCaseMock = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    }

    sut['listUsersUseCase'] = listUsersUseCaseMock as any;

    const searchParams = {
      page: 1,
      perPage: 1,
    }

    const result: ListUsersUsecase.Output = await sut.search(searchParams);

    expect(output).toStrictEqual(result)
    expect(listUsersUseCaseMock.execute).toHaveBeenCalledWith(searchParams);
  })
});
