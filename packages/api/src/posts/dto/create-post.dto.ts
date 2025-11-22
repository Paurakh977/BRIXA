export class CreatePostDto {
  title: string;
  content?: string;
  published?: boolean;
  authorId: number;
}