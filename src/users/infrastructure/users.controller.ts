import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, Query, Put } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SignUpUsecase } from '../application/usecases/signup.usecase';
import { SignInUsecase } from '../application/usecases/signin.usecase';
import { UpdatePasswordUsecase } from '../application/usecases/update-password.usecase';
import { UpdateUserUsecase } from '../application/usecases/update-user.usecase';
import { ListUsersUsecase } from '../application/usecases/listusers.usecase';
import { GetUserUseCase } from '../application/usecases/getuser.usecase';
import { DeleteUserUsecase } from '../application/usecases/delete-user.usecase';
import { SigninDto } from './dtos/signin.dto';
import { ListUsersDto } from './dtos/listusers.dto';
import { UpdatePasswordDto } from './dtos/updatepassword.dto';

@Controller('users')
export class UsersController {

  @Inject(SignUpUsecase.UseCase)
  private signupUseCase: SignUpUsecase.UseCase;

  @Inject(SignInUsecase.UseCase)
  private signinUseCase: SignInUsecase.UseCase;

  @Inject(UpdatePasswordUsecase.UseCase)
  private updatePasswordUseCase: UpdatePasswordUsecase.UseCase;

  @Inject(UpdateUserUsecase.UseCase)
  private updateUserUseCase: UpdateUserUsecase.UseCase;

  @Inject(ListUsersUsecase.UseCase)
  private listUsersUseCase: ListUsersUsecase.UseCase;

  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase;

  @Inject(DeleteUserUsecase.UseCase)
  private deleteUserUseCase: DeleteUserUsecase.UseCase;

  @Post()
  async create(@Body() signupDto: SignupDto) {
    return this.signupUseCase.execute(signupDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() signIn: SigninDto) {
    return this.signinUseCase.execute(signIn);
  }

  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    return this.listUsersUseCase.execute(searchParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUserUseCase.execute({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute({ id, ...updateUserDto });
  }

  @Patch(':id')
  async updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.updatePasswordUseCase.execute({ id, ...updatePasswordDto });
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id });
  }
}
