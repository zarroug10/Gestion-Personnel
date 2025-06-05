export interface WorkTimeEntry {
    id: string,
    startDate: string,
    endDate:string,
    description:string,
    userId:string,
    username:string,
    isApproved: boolean,
    isPending: boolean
  }

export interface workRequest{
  startDate: string,
  endDate: string,
  description: string,
  isApproved: boolean,
  isPending: boolean
}

export interface workTimeGroup{
 year:number,
 month: number,
 monthStatus:string,
 records: WorkTimeEntry[]
}

