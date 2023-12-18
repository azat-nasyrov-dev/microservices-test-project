import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersMicroserviceService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(user: Partial<UserEntity>) {
    const hashedPassword = this.hashPassword(user.password);
    const newUser = this.userRepository.create({
      email: user.email,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  public async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async findUserById(id: string) {
    if (!id) {
      return null;
    }

    return await this.userRepository.findOne({ where: { id } });
  }

  public async deleteUserById(id: string) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.remove(user);
  }

  public async updateUserById(id: string, attrs: Partial<UserEntity>) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return await this.userRepository.save(user);
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
