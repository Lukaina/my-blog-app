import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UnauthorizedException,
  Req,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../schemas/user.schema';
import { AdminGuard } from 'src/middlewares/authentication.middleware';

@Controller('users')
export class UsersController {
  authService: any;
  constructor(private readonly usersService: UsersService) {}

  //POST /users - Registro de nuevos usuarios.
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    try {
      await this.usersService.createUser(createUserDto);
      return 'User successfully registered';
    } catch (error) {
      throw new Error(`User could not be registered. Error: ${error.message}`);
    }
  }

  //POST /users/login - Inicio de sesión para usuarios.
  @Post('login')
  login(@Body() loginData: LoginDto) {
    const { email, password } = loginData;

    const isValidUser = this.authService.validateUser(email, password);

    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateToken(email);

    return { token };
  }

  //GET /users - Listado de usuarios (restringido a administradores).
  @Get()
  @UseGuards(AdminGuard)
  findAll(@Req() request): Promise<User[]> {
    const user = request.user;

    if (user && user.role === 'admin') {
      return this.usersService.findAll();
    } else {
      throw new UnauthorizedException('No permission to access this route');
    }
  }

  //GET /users/{id} - Obtener detalles de un usuario específico.
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  //PUT /users/{id} - Actualizar un usuario específico (solo su propio perfil o si es administrador).
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ) {
    const currentUser = request.user;

    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (currentUser.id !== user.id && !currentUser.isAdmin) {
      throw new UnauthorizedException('No permission to update this profile');
    }

    return this.usersService.updateUser(user, updateUserDto);
  }

  //DELETE /users/{id} - Eliminar un usuario (solo administradores).
  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string, @Req() request) {
    const currentUser = request.user;

    if (!currentUser.isAdmin) {
      throw new UnauthorizedException('No permission to delete users');
    }

    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersService.remove(id);

    return 'User deleted successfully';
  }
}
