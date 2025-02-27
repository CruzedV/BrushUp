import type { Metadata } from "next";
import { ConfigProvider } from "antd";


import "@/globals.scss";
import variables from "@/variables.module.scss";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Sider from "@/components/layout/Sider/Sider";
import ScrollTop from "@/components/layout/ScrolllTop";

export const metadata: Metadata = {
  title: "BrushUp",
  description: "Artist blog site",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        "token": {
          "colorPrimary": variables.primaryColor,
          "colorInfo": variables.infoColor,
          "colorTextBase": variables.textColor,
          "colorBgBase": variables.fgColor,
          "wireframe": true,
          "borderRadius": 8,
          "colorLink": variables.linkColor
        }          
      }}
    >
      <Header />
      <div className="content">
        <div className="mainContent">
          {children}
        </div>
        <Sider />
        <ScrollTop />
      </div>
      <Footer />
    </ConfigProvider>
  );
}
