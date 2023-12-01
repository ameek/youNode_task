import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserClientService } from "src/services/user.service";

@Module({
    imports: [
        ConfigModule,
        ClientsModule.register([
          {
            name: "USER_SERVICE",
            transport: Transport.TCP,
            options: {
              host: 'localhost',//process.env.PURCHASE_HISTORY_SERVICE_HOST,
              port: 3001//process.env.PURCHASE_HISTORY_SERVICE_PORT,
            },
          }  
        ])
    ],
    providers:[UserClientService],
    exports:[UserClientService]
})
export class UserClientModule {}