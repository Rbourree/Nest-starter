import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'Your email account'
  })
  email: string;

  @ApiProperty({
    description: 'Your strong password, minimum of 8 characters, maximum of 20 characters, lower case letters, upper case letter(s), number(s), Special Character(s) (@#$^&*+=)',
    minLength: 8,
    maxLength: 20
})
  password: string;
}

export class SignUpDto {
    @ApiProperty()
    firstname: string;
  
    @ApiProperty()
    lastname: string;

    @ApiProperty()
    email: string;
  
    @ApiProperty()
    password: string;
  }