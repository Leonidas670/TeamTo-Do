export class CreateTaskDto {
  author: string;
  text: string;
  completed?: boolean;
  editor?: string | null;
}
