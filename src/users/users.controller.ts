import { Param, Controller, Get, Body, Put, Delete, UseGuards, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from "../auth/auth.guard";
import { updateUserDto } from "./user.dto";

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/user/:id_user')
  async getByID(@Param('id_user') id_user: string) {
    const user = await this.userService.findByID(id_user)
    
    if(!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    }, HttpStatus.NOT_FOUND);

    return this.userService.findByID(id_user)
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  async getAll(){
    const users = await this.userService.findAll()
    return users;
  }

  @UseGuards(AuthGuard)
  @Put('/user/:id_user')
  async update(@Param('id_user') id_user: string, @Body() userData: updateUserDto) {
    return await this.userService.update(id_user, userData)
  }

  @UseGuards(AuthGuard)
  @Delete('/user/:id_user')
  @HttpCode(200)
  async delete(@Param('id_user') id_user: string) { 
    await this.userService.delete(id_user);
    return;
  }
}