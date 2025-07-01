import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../users.controller';
import { UserOutput } from '@/users/application/dtos/user-output';
import { SignUpUsecase } from '@/users/application/usecases/signup.usecase';
import { SignupDto } from '../../dtos/signup.dto';

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
});
