// types/Student.ts
export interface Student {
  _id: string;
  userId: string;
  classId: string;
  achievements: any[];
  subject: any[];
  assignments: any[];
  parentId: any[];
  attendance: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentResponse {
  message: string;
  student: Student;
  success: boolean;
}
