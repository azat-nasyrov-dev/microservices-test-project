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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersMicroserviceController {
  constructor(
    private readonly usersMicroserviceService: UsersMicroserviceService,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created' })
  @Post()
  @UsePipes(new ValidationPipe())
  public async createUser(@Body() dto: CreateUserDto) {
    return await this.usersMicroserviceService.createUser(dto);
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, description: 'Return user by email' })
  @Get(':email')
  public async findUserByEmail(@Param('email') email: string) {
    return await this.usersMicroserviceService.findUserByEmail(email);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user by id' })
  @Get(':id')
  public async findUserById(@Param('id') id: string) {
    const user = await this.usersMicroserviceService.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Deleted user by id' })
  @Delete(':id')
  public async deleteUserById(@Param('id') id: string) {
    return await this.usersMicroserviceService.deleteUserById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 201, description: 'Updated user by id' })
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  public async updateUserById(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usersMicroserviceService.updateUserById(id, dto);
  }
}
