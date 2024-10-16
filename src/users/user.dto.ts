import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
  @ApiProperty({
    description: 'Your firstname'
  })
  firstname: string;

  @ApiProperty({
    description: 'Your lastname',
})
  lastname: string;
}
