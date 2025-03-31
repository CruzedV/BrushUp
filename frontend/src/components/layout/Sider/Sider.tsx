import "../../../globals.scss";
import { Card } from "antd";
import LatestItem from "./LatestItem";
import ButtonSection from "./ButtonSection";
import { requestWithReturn } from "@/helpers/functions/requestWithReturn";
import { TPost } from "@shared/types/post";
import { getInterestingPosts } from "@/api/posts";

const Sider = async () => {
  const interestingPosts = await requestWithReturn<undefined, TPost[]>(
    getInterestingPosts,
    undefined,
  );

  return (
    <div className="sider">
      <Card className="siderLatest">
        <h3>Вам может быть интересно</h3>
        <div className="siderLatestList">
          {interestingPosts && 
            <>
              {interestingPosts.length > 0 ? (
                <>
                  {interestingPosts.map((post: TPost, index: number) => (
                    <LatestItem post={post} key={post.article_id + index} />
                  ))}
                </>
              ) : (
                <div className="feedbackContainer">
                  Не найдено интересных постов
                </div>
              )}
            </>
          }
        </div>
      </Card>
      <Card className="siderActions">
        <ButtonSection />
      </Card>
    </div>
  )
};

export default Sider;
