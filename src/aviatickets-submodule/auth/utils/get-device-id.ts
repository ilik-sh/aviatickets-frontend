import { LocalStorageKeys } from "enums/local-storage-keys.enum";
import { v4 as uuidv4 } from "uuid";

export const getDeviceId = () => {
  let device = localStorage.getItem(LocalStorageKeys.DeviceId);

  if (!device) {
    device = uuidv4();
    localStorage.setItem(LocalStorageKeys.DeviceId, device);
  }

  return device;
};
