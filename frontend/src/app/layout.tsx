import React, { useEffect } from "react";
import variables from "@/variables.module.scss";
import { ConfigProvider } from "antd";
import { Metadata } from "next";
import { authUser } from "helpers/functions/authUser";
import { useMessages } from "helpers/hooks/useMessages";
import { useUserStore } from "store/user";

export const metadata: Metadata = {
  title: "BrushUp",
  description: "Blog site for artists",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}