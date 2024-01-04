import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'tuSecretJWT', // Usa una clave secreta más segura y guárdala en variables de entorno
      signOptions: { expiresIn: '60s' }, // Configura la duración de la validez del token
    }),
    // ...otros imports
  ],
  // ...controladores y proveedores
})
export class AuthModule {}