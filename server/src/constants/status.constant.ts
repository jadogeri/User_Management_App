import { Status } from "../entities/status.entity";
import { StatusEnum } from "../types/status.type";

export const EnabledStatus = new Status(1, StatusEnum.ENABLED);
export const LockedStatus = new Status(2, StatusEnum.LOCKED);
export const DisabledStatus = new Status(3, StatusEnum.DISABLED);