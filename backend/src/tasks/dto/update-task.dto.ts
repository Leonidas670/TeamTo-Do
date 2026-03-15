export class UpdateTaskDto {
  author?: string;
  text?: string;
  completed?: boolean;
  editor?: string | null;
  teamId?: number | null;
}
