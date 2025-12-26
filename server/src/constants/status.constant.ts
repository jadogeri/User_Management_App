import { Status } from "../entities/status.entity";
import { StatusEnum } from "../types/status.type";

export const EnabledStatus = new Status();
export const LockedStatus = new Status();
export const DisabledStatus = new Status();
EnabledStatus.id = 1;
EnabledStatus.name = StatusEnum.ENABLED;
LockedStatus.id = 2;
LockedStatus.name = StatusEnum.LOCKED;
DisabledStatus.id = 3;
DisabledStatus.name = StatusEnum.DISABLED;