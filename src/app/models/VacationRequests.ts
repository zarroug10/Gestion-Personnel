export interface VacationRequests {
    id: string;
    employeeId: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    username:string;
    isApproved: boolean;
    isPending: boolean;
}