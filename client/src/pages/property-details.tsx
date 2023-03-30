import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { CustomButton } from "components";
import { useNavigate, useParams } from "react-router-dom";

const checkImage = (url: any) => {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
};

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {};

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>;

  // @ts-ignore
  const isCurrentUser = user.email === propertyDetails.creator.email;
  const handleDeleteProperty = () => {
    const response = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (response) {
      mutate(
        {
          resource: "properties",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        }
      );
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Details
      </Typography>

      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        alignItems="center"
        gap={4}
      >
        <Box display="flex" flexDirection="column" flex={1} maxWidth={764}>
          <Box>
            <img
              src={propertyDetails.photo}
              alt={propertyDetails.title}
              height={546}
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
              className="property_details-img"
            />
          </Box>

          <Box mt="15px">
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142d"
                textTransform="capitalize"
              >
                {propertyDetails.propertyType}
              </Typography>

              {/* review stars, change it to dynamic by implementing backend models */}
              <Box>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={`star-${star}`} sx={{ color: "#f2c94c" }}></Star>
                ))}
              </Box>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color="#11142d"
                  textTransform="capitalize"
                >
                  {propertyDetails.title}
                </Typography>

                <Stack direction="row" mt={0.5} alignItems="center" gap={0.5}>
                  <Place sx={{ color: "#808191" }}></Place>
                  <Typography fontSize={14} color="#808191">
                    {propertyDetails.location}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mt="10px"
                  color="#11142D"
                >
                  Price
                </Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">
                    ${propertyDetails.price}
                  </Typography>
                  <Typography fontSize={14} mb={0.5} color="#808191">
                    for one month
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack mt="25px" gap="3px">
              <Typography
                mb="10px"
                fontSize={18}
                fontWeight={500}
                color="#11142d"
              >
                Description
              </Typography>

              {propertyDetails.description
                .split("\n")
                .map((description: string, idx: number) => (
                  <Typography key={`desc-${idx}`} fontSize={14} color="#808191">
                    {description}
                  </Typography>
                ))}
            </Stack>
          </Box>
        </Box>

        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <Stack
            width="100%"
            p={2}
            justifyContent="center"
            alignItems="center"
            border="1px solid #e4e4e4"
            borderRadius={2}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={
                  checkImage(propertyDetails.creator.avatar)
                    ? propertyDetails.creator.avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="avatar"
                height={90}
                width={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />

              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142d">
                  {propertyDetails.creator.name}
                </Typography>
                <Typography
                  mt="3px"
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  Agent
                </Typography>
              </Box>

              <Stack mt="12px" direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: "#808191" }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">
                  {propertyDetails.location}
                </Typography>
              </Stack>

              <Typography mt={1} fontWeight={600} fontSize={16} color="#11142d">
                {propertyDetails.creator.allProperties.length > 0
                  ? `${propertyDetails.creator.allProperties.length} Properties`
                  : "No Properties"}
              </Typography>
            </Stack>

            <Stack width="100%" mt={3} direction="row" gap={2} flexWrap="wrap">
              <CustomButton
                title={!isCurrentUser ? "Message" : "Edit"}
                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                backgroundColor="#475BE8"
                fullWidth
                color="#fcfcfc"
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/properties/edit/${propertyDetails._id}`);
                  }
                }}
              ></CustomButton>

              <CustomButton
                title={!isCurrentUser ? "Call" : "Delete"}
                backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              ></CustomButton>
            </Stack>
          </Stack>

          <Stack>
            <img
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              alt={propertyDetails.location}
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: "cover" }}
            />
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
