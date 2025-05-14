export interface VacationRequests {
    id: number;
    employeeId: number;
    startDate: Date;
    endDate: Date;
    reason: string;
    isApproved: boolean;
    isPending: boolean;
}