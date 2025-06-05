export interface User {
    id: string
    username: string;
    email: string;
    cin: string;
    gender: string,
    status:string,
    kidsNumber:number,
    roles?: string[];
    contract:Contract;
}

export interface Contract {
    id: string;
    startDate:string;
    endDate:string;
    salary:number;
    contractType:string[];
    ownerId:string
}

export interface CurrentUser{
  id: string,
  email: string,
  cin: string,
  status: string,
  gender: string,
  username: string,
  isAuthenticated: boolean,
  isAdmin: boolean,
  isRH: boolean,
  isResponsable: boolean,
  isDirecteur: boolean,
  isEmployee: boolean,
  roles: string[]
}

export interface Updatedform{
      username: string,
      email:string,
      cin:string,
      status:number
}
