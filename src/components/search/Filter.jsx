import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import { useGetAllInsitutesQuery } from "../../services/UserInstituteService";
import {
  generateSemesters,
  removeVietnameseTones,
} from "../../utils/ConvertData";
function Filter({
  onChangeSearchOptions,
  resetSearchOptions,
  subjectDocumentTypes,
  subjectDocumentFilter,
  searchOptions,
}) {
  const [openFilterOption, setOpenFilterOption] = useState(undefined);
  const [keyFilter, setKeyFilter] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [filterOptions, setFilterOptions] = useState([
    {
      value: 1,
      title: "Trường-Viện",
      items: [],
    },
    {
      value: 2,
      title: "Học phần",
      items: [],
    },
    {
      value: 3,
      title: "Loại tài liệu",
      items: [],
    },
    {
      value: 4,
      title: "Học kỳ",
      items: generateSemesters().map((semester) => ({
        title: semester,
        value: semester,
        checked: false,
      })),
    },
  ]);
  const resetFilterOptions = () => {
    setOpenFilterOption(undefined);
    resetSearchOptions();
    setFilterOptions((preState) =>
      preState.map((filter) => {
        if (filter.value !== 2) {
          filter.items = filter.items.map((item) => ({
            ...item,
            checked: false,
          }));
          return filter;
        }
        filter.items = [];
        return filter;
      })
    );
  };
  useEffect(() => {
    setFilterOptions((preState) => [
      preState[0],
      {
        value: 2,
        title: "Học phần",
        items:
          subjectDocumentFilter.item?.map((subject) => ({
            title: `${subject.data.subjectCode} | ${subject.data.name}`,
            value: subject.data.id,
            checked: false,
          })) || [],
      },
      preState[2],
      preState[3],
    ]);
  }, [subjectDocumentFilter]);
  useEffect(() => {
    setFilterOptions((preState) => [
      preState[0],
      preState[1],
      {
        value: 3,
        title: "Loại tài liệu",
        items:
          subjectDocumentTypes?.map((subjectDocumentType) => ({
            value: subjectDocumentType.id,
            title: subjectDocumentType.name,
            checked: false,
          })) || [],
      },
      preState[3],
    ]);
  }, [subjectDocumentTypes]);
  const onHandleChangeKey = (e) =>
    setKeyFilter((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  const { data: institutes, isSuccess } = useGetAllInsitutesQuery();
  useEffect(() => {
    if (isSuccess)
      setFilterOptions((preState) => {
        const newFilterOptions = [
          {
            value: 1,
            title: "Trường-Viện",
            items:
              institutes?.map((institute) => ({
                title: institute.institute,
                value: institute.id,
                checked: false,
              })) || [],
          },
          ...preState.filter((options) => options.value !== 1),
        ];
        return newFilterOptions;
      });

    // eslint-disable-next-line
  }, [isSuccess]);
  const handleSelectFilterOptions = (filter, item) => {
    onChangeSearchOptions(filter.value, item.value);
    setFilterOptions((preState) =>
      preState.map((filter_) => {
        if (filter_.value === filter.value) {
          filter_.items = filter_.items.map((subItem) => {
            if (subItem.value !== item.value) return subItem;
            return {
              ...subItem,
              checked: !subItem.checked,
            };
          });
        }
        return filter_;
      })
    );
    if (filter.value === 1) {
      setFilterOptions((preState) => [
        preState[0],
        {
          value: 2,
          title: "Học phần",
          items:
            subjectDocumentFilter.item
              ?.filter(
                (s) =>
                  searchOptions[1].length === 0 ||
                  searchOptions[1].find(
                    (instituteID) => instituteID === s.data.institute.id
                  ) !== undefined
              )
              .map((subject) => ({
                title: `${subject.data.subjectCode} | ${subject.data.name}`,
                value: subject.data.id,
                checked: false,
              })) || [],
        },
        preState[2],
        preState[3],
      ]);
    }
  };
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"end"}
        justifyContent={"space-between"}
        height={"60px"}
        pb={1}
        px={3}
      >
        <Typography
          fontWeight={"bold"}
          variant="h4"
          color={"text.secondary"}
          display={"flex"}
          alignItems={"center"}
        >
          <IconButton>
            <FilterListIcon />
          </IconButton>
          Lọc tài liệu
        </Typography>
        <Typography
          variant="h4"
          color={"primary"}
          display={"flex"}
          alignItems={"center"}
        >
          <IconButton onClick={resetFilterOptions} color="inherit">
            <RestartAltIcon />
          </IconButton>
          Đặt lại
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={2} pt={2} px={4}>
        {filterOptions.map((filter) => (
          <Stack spacing={1} key={`${filter.title}-${filter.value}`}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color={"#D8D9D9"}
                variant="h5"
              >
                {filter.title}{" "}
                <small style={{ color: "black", fontWeight: 700 }}>
                  (
                  {openFilterOption === filter.value
                    ? filter.items.length < 8
                      ? filter.items.length
                      : 8
                    : openFilterOption === undefined
                    ? filter.items.length < 2
                      ? filter.items.length
                      : 2
                    : 0}
                  /{filter.items.length})
                </small>
              </Typography>
              <IconButton
                onClick={() =>
                  setOpenFilterOption((preState) =>
                    preState === filter.value ? undefined : filter.value
                  )
                }
              >
                <KeyboardArrowDownIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "blue" },
                    transition: "transform 0.4s",
                    transform:
                      openFilterOption === filter.value
                        ? "rotate(0)"
                        : "rotate(-90deg)",
                  }}
                />
              </IconButton>
            </Box>
            <Stack
              pl={1}
              overflow={"hidden"}
              height={
                openFilterOption === filter.value
                  ? filter.items.length <= 8
                    ? `${filter.items.length * 40 + 30}px`
                    : "350px"
                  : openFilterOption === undefined
                  ? filter.items.length <= 2
                    ? `${filter.items.length * 40 + 30}px`
                    : "110px"
                  : "30px"
              }
              sx={{ transition: "height 0.4s" }}
            >
              {filter.items
                .filter(
                  (item) =>
                    keyFilter[filter.value] === "" ||
                    removeVietnameseTones(item.title)
                      .toUpperCase()
                      .includes(
                        removeVietnameseTones(
                          keyFilter[filter.value]
                        ).toUpperCase()
                      )
                )
                .sort((itemA, itemB) =>
                  itemA.checked ? -1 : itemB.checked ? 1 : 0
                )
                .slice(
                  0,
                  openFilterOption === undefined
                    ? 2
                    : openFilterOption === filter.value
                    ? 8
                    : 0
                )
                .map((item) => (
                  <Stack
                    key={`${filter.title}-item-${item.value}`}
                    direction={"row"}
                    spacing={1}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Checkbox
                      checked={item.checked}
                      onChange={() => handleSelectFilterOptions(filter, item)}
                    />{" "}
                    <Typography
                      variant="h5"
                      color={
                        keyFilter[filter.value] !== "" &&
                        removeVietnameseTones(item.title)
                          .toUpperCase()
                          .includes(
                            removeVietnameseTones(
                              keyFilter[filter.value]
                            ).toUpperCase()
                          ) &&
                        "primary"
                      }
                      maxWidth={"100%"}
                      noWrap
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                ))}
              <Input
                name={`${filter.value}`}
                onChange={onHandleChangeKey}
                id="standard-adornment-amount"
                onFocus={() => setOpenFilterOption(filter.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton sx={{ "&:hover": { bgcolor: "transparent" } }}>
                      <FilterListIcon />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder={`Nhập tên ${filter.title} mà bạn muốn tìm`}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default Filter;
