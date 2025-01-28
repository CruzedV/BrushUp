import React from "react";
import variables from "@/variables.module.scss";
import { ConfigProvider } from "antd";
import Header from "@/components/layout/Header";

export default function ReferenceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <html lang="en">
    <body>
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
        <div className="reference">
          {children}
        </div>
      </ConfigProvider>
    </body>
  </html>
}