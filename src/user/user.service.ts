import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();

    newUser.name = createUserDto.name;
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.age = createUserDto.age;
    newUser.password = createUserDto.password;
    newUser.gender = createUserDto.gender;

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = new User();
    updateUser.name = updateUserDto.name;
    updateUser.username = updateUserDto.username;
    updateUser.email = updateUserDto.email;
    updateUser.age = updateUserDto.age;
    updateUser.password = updateUserDto.password;
    updateUser.gender = updateUserDto.gender;
    updateUser.id = id;

    const findUser = this.userRepository.findOne({ where: { id } });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.save(updateUser);
  }

  async remove(id: number) {
    const findUser = this.userRepository.findOne({ where: { id } });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.delete({ id });
  }
}
