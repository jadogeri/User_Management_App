import { Status } from "../entities/status.entity";
import { StatusEnum } from "../types/status.type";

const EnabledStatus = new Status();
const LockedStatus = new Status();
const DisabledStatus = new Status();
EnabledStatus.id = 1;
EnabledStatus.name = StatusEnum.ENABLED;
LockedStatus.id = 2;
LockedStatus.name = StatusEnum.LOCKED;
DisabledStatus.id = 3;
DisabledStatus.name = StatusEnum.DISABLED;


export { EnabledStatus, LockedStatus, DisabledStatus };