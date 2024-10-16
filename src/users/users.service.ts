import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from './users.entity';



interface UpdateUser {
  firstname?: string;
  lastname?: string;
}


@Injectable()
export class UsersService {

  private userRepository;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async findByID(id_user: string) {
    const user = await this.userRepository.findOneBy({ id_user });

    if (!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    }, HttpStatus.NOT_FOUND);

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id_user: string, data: UpdateUser) {
    let user = await this.userRepository.findOneBy({ id_user });

    if (!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    }, HttpStatus.NOT_FOUND);

    let userUpdate = { ...user, ...data }
    return await this.userRepository.save(userUpdate);
  }

  async delete(id_user: string) {
    let user = await this.userRepository.findOneBy({ id_user });

    if (!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    }, HttpStatus.NOT_FOUND);

    return await this.userRepository.remove(user);
  }
}