import { Add } from "@mui/icons-material";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTable } from "@refinedev/core";
import { useNavigate } from "react-router";

import { CustomButton, PropertyCard } from "components";
import { useMemo } from "react";

const AllProperties = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];
  const defaultPageSize = 10;
  const pageSizes = [10, 20, 30, 40, 50];
  const propertyTypes = [
    "Apartment",
    "Villa",
    "Farmhouse",
    "Condos",
    "Townhouse",
    "Duplex",
    "Studio",
    "Chalet",
  ];

  // sort properties by price
  const currentPrice = sorters.find((item) => item.field === "price")?.order;
  const toggleSort = (field: string) => {
    setSorters([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  // filter properties by different fields, such as title, type
  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      propertyType:
        logicalFilters.find((item) => item.field === "propertyType")?.value ||
        "",
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length
              ? "There are no properties"
              : "All Properties"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
            >
              <CustomButton
                title={`Sort price ${currentPrice === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("price")}
                backgroundColor="#475be8"
                color="#fcfcfc"
              ></CustomButton>

              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              ></TextField>

              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilterValues.propertyType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "propertyType",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
              >
                <MenuItem value="">All</MenuItem>
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton
          title="Add Property"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add></Add>}
        ></CustomButton>
      </Stack>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}
          ></PropertyCard>
        ))}
      </Box>

      {/* display pagination */}
      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          ></CustomButton>

          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px"
          >
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>

          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          ></CustomButton>

          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={defaultPageSize}
            onChange={(e) => {
              setPageSize(
                e.target.value ? Number(e.target.value) : defaultPageSize
              );
            }}
          >
            {/* page sizes to choose */}
            {pageSizes.map((size) => {
              return (
                <MenuItem key={size} value={size}>
                  Show {size}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
