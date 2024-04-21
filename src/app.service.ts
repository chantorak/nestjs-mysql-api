import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createUser(user: any): string {
    console.log(user);
    return 'Hello World 3!';
  }
}
