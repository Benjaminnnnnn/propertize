import { Button } from "@mui/material";
import { TitleProps, useLink } from "@refinedev/core";
import React from "react";

import { logo, propertize } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const Link = useLink();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Yariga" width="28px" />
        ) : (
          <img src={propertize} alt="Refine" width="140px" />
        )}
      </Link>
    </Button>
  );
};
