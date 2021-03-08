export interface Plant {
  id: number;
  name: string;
  biodiversityResourceKey: number;
  userId: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  plants: Array<Plant>;
}
