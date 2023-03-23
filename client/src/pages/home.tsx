import { Box, Stack, Typography } from "@mui/material";
import { PieChart, PropertyReferrals, TotalRevenue } from "components";

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        ></PieChart>

        <PieChart
          title="Properties for Rent"
          value={490}
          series={[40, 60]}
          colors={["#275be8", "#c4e8ef"]}
        ></PieChart>

        <PieChart
          title="Total Customers"
          value={5765}
          series={[85, 15]}
          colors={["#275be8", "#c4e8ef"]}
        ></PieChart>
        <PieChart
          title="Properties for Cities"
          value={555}
          series={[55, 45]}
          colors={["#275be8", "#c4e8ef"]}
        ></PieChart>
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue></TotalRevenue>
        <PropertyReferrals></PropertyReferrals>
      </Stack>
    </Box>
  );
};

export default Home;
