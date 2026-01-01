import User from "../entities/user.entity";
import { AdminRole } from "./role.data";
import { EnabledStatus } from "./status.data";

const root = new User();
root.id = 1;
root.username = "root";
root.email = "root@example.com";
root.password = "RootPass123!";
root.role = AdminRole;
root.status = EnabledStatus;
