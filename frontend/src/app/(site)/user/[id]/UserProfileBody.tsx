import Avatar from '@/components/Posts/Avatar';
import styles from './styles.module.scss';
import { Card } from 'antd';
import { EAvatar } from '@/variants/avatar';
import PageTitle from '@/components/common/PageTitle';
import PostsListWithFeedback from '@/components/Posts/PostsList';
import { TUser } from '@/types/user';
import { EPostList } from '@/enums/post';
import FollowUserButton from './FollowUserButton';

type TProps = {
  user: TUser | null;
};

const UserProfileBody = async ({ user }: TProps) => {

  if (!user) {
    return (
      <span>Пользователь не найден</span>
    )
  }
  
  return (
    <>
      <article className={styles.userPage}>
        <PageTitle>Личная страница пользователя</PageTitle>
        <Card className={styles.userPageInfo}>
          <Avatar
            user={user}
            variant={EAvatar.big}
            action={<FollowUserButton user_id={user.user_id} />}
          />
          <span>{user.bio}</span>
        </Card>
        <div className={styles.userPagePosts}>
          <span className={styles.userPagePostsTitle}>
            Посты пользователя
          </span>
          <PostsListWithFeedback variant={EPostList.USER} user_id={user.user_id} />
        </div>
      </article>
    </>
  );
};

export default UserProfileBody;
