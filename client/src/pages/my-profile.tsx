import { Box } from "@mui/material";
import { useGetIdentity, useOne } from "@refinedev/core";
import { Profile } from "components";

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    // @ts-ignore
    id: user?.userid,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>;

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    ></Profile>
  );
};

export default MyProfile;
