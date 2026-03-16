export class AddMemberDto {
  email: string;
  role?: 'ADMIN' | 'MEMBER';
  inviterId: number;
}
