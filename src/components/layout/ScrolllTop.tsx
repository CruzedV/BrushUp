"use client";

import { CaretUpOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ScrollTop = () => {
  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className="scrollTop" onClick={handleScrollTop}>
      <Button type="primary" shape="circle">
        <CaretUpOutlined />
      </Button>
    </div>
  );
};

export default ScrollTop;