export interface I_MetaData {
  menuItems: { name: string; value: string }[] | null;
  genders: { name: string; value: string }[] | null;
  roles: { name: string; value: string }[] | null;
  userType: { name: string; value: string }[] | null;
  accessRight: string[];
  ownerNeedtocreate: boolean;
}
