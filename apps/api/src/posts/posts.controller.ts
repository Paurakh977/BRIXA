import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import type { CreatePostDto, UpdatePostDto } from '@BRIXA/api';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() body: CreatePostDto) {
    return this.postsService.create(body);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}