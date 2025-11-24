export class CreatePostDto {
  title: string;
  content?: string;
  authorId: number; // Frontend sends this
  published?: boolean;
}