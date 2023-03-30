import { Box, Stack, Typography } from "@mui/material";
import { useList } from "@refinedev/core";
import {
  PieChart,
  PropertyCard,
  PropertyReferrals,
  TotalRevenue,
} from "components";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error</Typography>;

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

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize={18} fontWeight={600} color="#11142d">
          Latest Properties
        </Typography>
        <Box mt={2.5} display="flex" flexWrap="wrap" gap={4}>
          {latestProperties.map((property) => {
            return (
              <PropertyCard
                key={property._id}
                id={property._id}
                title={property.title}
                price={property.price}
                location={property.location}
                photo={property.photo}
              ></PropertyCard>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
