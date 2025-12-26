import { Role } from "../entities/role.entity";
import { RoleEnum } from "../types/role.type";

export const AdminRole = new Role();
export const UserRole = new Role();
AdminRole.id = 1;
AdminRole.name = RoleEnum.ADMIN;
UserRole.id = 2;
UserRole.name = RoleEnum.USER;  