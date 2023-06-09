import { Box } from "@mui/material";
import type { RefineLayoutLayoutProps } from "@refinedev/mui";
import React from "react";
import { Header as DefaultHeader } from "../header";
import { Sider as DefaultSider } from "../sider";
import { Title as DefaultTitle } from "../title";

export const Layout: React.FC<RefineLayoutLayoutProps> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;
  const TitleToRender = Title ?? DefaultTitle;

  return (
    <Box display="flex" flexDirection="row">
      <SiderToRender Title={TitleToRender} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <HeaderToRender />
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
