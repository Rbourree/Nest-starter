import { Body, Controller, Post, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from "./auth.dto";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  @ApiOperation({ summary: 'Create new account' })
  @HttpCode(201)
  async signUp(@Body() user: SignUpDto) {
    try {
      await this.authService.signup(user);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: error,
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login account' })
  @ApiResponse({
    status: 200, example: {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTQ2NmRmMi0zM2UxLTQ3MmQtOGY1NC05YWY4ZTg3OWJlNmIiLCJ1c2VybmFtZSI6IlJvbWFpbiBCb3VycsOpZSIsImlhdCI6MTcyOTA5MTY0NH0.08D4k5yMcIxxsZHuJW0D4NoznqnJVXMBc6HkqYNEIXk"
    }
  })
  async signIn(@Body() user: SignInDto) {
    return await this.authService.signin(user);
  }
}