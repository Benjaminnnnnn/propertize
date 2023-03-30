import { Box } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Profile } from "components";
import { useParams } from "react-router-dom";

const AgentProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  const agentProfile = data?.data ?? [];

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>;

  return (
    <Profile
      type="Agent"
      name={agentProfile.name}
      email={agentProfile.email}
      avatar={agentProfile.avatar}
      properties={agentProfile.allProperties}
    ></Profile>
  );
};

export default AgentProfile;
