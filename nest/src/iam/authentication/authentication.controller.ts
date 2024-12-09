import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { AuthType } from './enums/auth-type-emum';
import { Auth } from './decorators/auth.decorator';
import { Response } from 'express';
import { ActiveUser } from './decorators/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UsersService,
  ) {}

  @Post('sign-up')
  signUp(@Body() SignUpDto: SignUpDto) {
    return this.authService.signUp(SignUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const accessToken = await this.authService.signIn(signInDto);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    return accessToken;
  }

  @Auth(AuthType.Bearer)
  @Get('active-user')
  async activeUser(
    @Res({ passthrough: true }) response: Response,
    @ActiveUser() user: ActiveUserData) {
      console.log(user);
    response.cookie('user', user, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    return this.userService.findOne(user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
