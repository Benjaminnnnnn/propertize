import { Box, Typography } from "@mui/material";
import { useList } from "@refinedev/core";

import { AgentCard } from "components";

const Agent = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });

  const allAgents = data?.data ?? [];

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Agents List
      </Typography>

      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          backgroundColor: "#fcfcfc",
        }}
      >
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfProperties={agent.allProperties.length}
          ></AgentCard>
        ))}
      </Box>
    </Box>
  );
};

export default Agent;
