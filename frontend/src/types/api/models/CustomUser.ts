import { CustomRole } from "./CustomRole";

export type CustomUser = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: CustomRole;
  createdAt?: string;
  updatedAt?: string;
};
