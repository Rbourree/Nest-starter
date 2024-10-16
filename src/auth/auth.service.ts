import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { DataSource } from 'typeorm';
  import { UserEntity } from '../users/users.entity';
  import * as bcrypt from 'bcrypt';
  
  export interface CreateUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isActive?: boolean;
  }
  
  export interface LoginUser {
    email: string;
    password: string;
  }
  
  @Injectable()
  export class AuthService {
  
    private userRepository;
    private logger = new Logger();
  
  
    constructor(private dataSource: DataSource, private jwtService: JwtService) {
      this.userRepository = this.dataSource.getRepository(UserEntity);
    }
  
    async signup(createUser: CreateUser): Promise<UserEntity> {
      try {
        const salt = await bcrypt.genSalt();
        createUser.password = await bcrypt.hash(createUser.password, salt);
        const user = await this.userRepository.create(createUser);
        return await this.userRepository.save(user);
      } catch (err) {
        if (err.code == 23505) {
          this.logger.error(err.message, err.stack);
          throw new HttpException('Username already exists', HttpStatus.CONFLICT);
        }
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }
  
    async signin(loginUser: LoginUser) {
      const user = await this.userRepository.findOneBy({ email: loginUser.email });
      if (!user)
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Account not found',
        }, HttpStatus.UNAUTHORIZED);
      
  
      let isMatch = await bcrypt.compare(loginUser.password, user.password);
  
      if (!isMatch)
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Wrong email or password',
        }, HttpStatus.UNAUTHORIZED);
  
      const payload = { sub: user.id_user, username: `${user.firstname} ${user.lastname}` };
      return {
        access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET }),
      };
    }
  }