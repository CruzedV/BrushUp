"use client";

import { checkIsFollowing, followUser, unfollowUser } from '@/api/users';
import { useUserStore } from '@/store/user';
import { LockOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { requestWithReturn } from '@/helpers/functions/requestWithReturn';
import { useMessages } from '@/helpers/hooks/useMessages';
import { useEffect, useState } from 'react';

type TProps = {
  user_id: string;
}

const FollowUserButton = ({ user_id }: TProps) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessage, contextHolder } = useMessages();
  const user = useUserStore((state) => state.user);


  const fetchFollowUser = async () => {
    const response = await requestWithReturn<string, number>(
      followUser,
      user_id,
      errorMessage,
      undefined,
      setIsLoading
    )
    if (response == 201) {
      setIsFollowed(true)
    }
  };

  const fetchUnfollowUser = async () => {
    const response = await requestWithReturn<string, number>(
      unfollowUser,
      user_id,
      errorMessage,
      undefined,
      setIsLoading
    )
    if (response == 200) {
      setIsFollowed(false);
    }
  }

  useEffect(() => {
    const checkFollow = async () => {
      await requestWithReturn<string, boolean>(
        checkIsFollowing,
        user_id,
        errorMessage,
        setIsFollowed,
      );
    };
    checkFollow();
  }, [])

  if (user_id == user?.user_id) {
    return null;
  }

  if (!user) {
    return (
      <Button type="primary" disabled={true}>
        <LockOutlined />
        Подписаться
      </Button>
    )
  }

  return (
    <> 
      {contextHolder}
      {isFollowed ? (
        <Button type="primary" onClick={fetchUnfollowUser} loading={isLoading}>
          <UserDeleteOutlined />
          Отписаться
        </Button>
      ) : (
        <Button type="primary" onClick={fetchFollowUser} loading={isLoading}>
          <UserAddOutlined />
          Подписаться
        </Button>
      )}
    </>
  )
}

export default FollowUserButton;