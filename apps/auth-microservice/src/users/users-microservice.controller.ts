import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersMicroserviceService } from './users-microservice.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersMicroserviceController {
  constructor(
    private readonly usersMicroserviceService: UsersMicroserviceService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  public async createUser(@Body() dto: CreateUserDto) {
    return await this.usersMicroserviceService.createUser(dto);
  }

  @Get(':email')
  public async findUserByEmail(@Param('email') email: string) {
    return await this.usersMicroserviceService.findUserByEmail(email);
  }

  @Get(':id')
  public async findUserById(@Param('id') id: string) {
    const user = await this.usersMicroserviceService.findUserById(parseInt(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Delete(':id')
  public async deleteUserById(@Param('id') id: string) {
    return await this.usersMicroserviceService.deleteUserById(parseInt(id));
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  public async updateUserById(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usersMicroserviceService.updateUserById(
      parseInt(id),
      dto,
    );
  }
}
