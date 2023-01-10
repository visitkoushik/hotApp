import { GENDER } from "./util";

export interface I_Employee {
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumbers: string;
  email: string;
  primaryAddressIndex: number;
  gender: GENDER;
  roles: string;
  dateOfBirth: Date;
  userType: string;
  dateOfExist: Date;
  dateOfJoin: Date;
  salary: number;
  isCurrent: boolean;
  passcode: string;
  userName: string;
  login?:{userName: string};
}
