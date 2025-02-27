import "@/globals.scss";
import React from "react";
import variables from "@/variables.module.scss";
import { ConfigProvider } from "antd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "References",
  description: "Random references to draw",
};

export default function ReferenceLayout({
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
      <div className="reference">
        {children}
      </div>
    </ConfigProvider>
  )
}