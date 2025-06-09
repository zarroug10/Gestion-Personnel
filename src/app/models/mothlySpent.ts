export interface monthlySpent {
id:string,
totalAmount: number,
month:string,
year: number,
username: string
}

export interface monthlySpentRequest {
totalAmount: number,
month:string,
year: number,
}