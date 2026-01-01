import { JwtPayload as BaseJwtPayload} from 'jsonwebtoken';
import Role from '../entities/role.entity';

export interface JwtPayloadInterface extends BaseJwtPayload {
  user:{
    username:string;
    email:string
    id: number,
    roles: Role[]
    [key: string]: any;

  };

  scopes?: string[] ;  
}