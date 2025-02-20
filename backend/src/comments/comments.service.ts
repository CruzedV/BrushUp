import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { addCommentDto, updateCommentDto } from "src/dto/comment.dto";
import { Comment } from "src/entities/comment.entity";
import { Post } from "src/entities/posts.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // Добавление комментария
  async addComment(user_id: number, dto: addCommentDto) {
    const post = await this.postRepository.findOne({
      where: { article_id: dto.article_id },
      relations: ["comments"],
    });

    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });

    if (!post) throw new NotFoundException("Пост не найден");
    if (!user) throw new NotFoundException("Пользователь не найден");
    const comment = this.commentRepository.create({
      user: user,
      post: post,
      text: dto.text,
    });
    return await this.commentRepository.save(comment);
  }

  async deleteComment(user_id: number, comment_id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { comment_id: comment_id },
      relations: ["user"],
    });

    if (!comment) throw new NotFoundException("Комментарий не найден");

    // Нужно получать пользователя по токену
    if (comment.user.user_id !== user_id) {
      throw new ForbiddenException("Нет доступа к удалению");
    }

    await this.commentRepository.remove(comment);
  }

  async updateComment(
    user_id: number,
    dto: updateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { comment_id: dto.comment_id },
      relations: ["user"],
    });

    if (!comment) throw new NotFoundException("Комментарий не найден");

    if (comment.user.user_id !== user_id) {
      throw new ForbiddenException("Нет доступа к редактированию");
    }

    comment.text = dto.text;
    return await this.commentRepository.save(comment);
  }
}
