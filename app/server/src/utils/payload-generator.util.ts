import User from "../entities/user.entity"
import { JwtPayloadInterface } from "../interfaces/jwt-payload.interface";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

export const payloadGenerator = (user: User): JwtPayloadInterface => {
    if (!user) {
        throw new ResourceNotFoundError("User is undefined or null");
    }
    let payload : JwtPayloadInterface = {
        user: {
            username: user.username, email: user.email, id: user.id, roles: user.roles
        },
        scopes: user.getPermissionNames(),
    }
    console.log("payload to be signed = ", payload);
    return payload;
}