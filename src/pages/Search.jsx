import {
  Box,
  Button,
  Checkbox,
  InputBase,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Filter from "../components/search/Filter";
import Content from "../components/search/Content";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchSubjectDocumentMutation } from "../services/SearchService";
import { useGetAllSubjectDocumentTypesQuery } from "../services/UserSubjectDocumentTypeService";
import { useGetAllSubjectForFilterQuery } from "../services/FilterService";
function Search() {
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchOptions, setSerchOptions] = useState({
    key: "",
    deepSearch: false,
    fuzzySearch: false,
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const { data: subjectDocumentTypes } = useGetAllSubjectDocumentTypesQuery();
  const { data: subjectDocumentFilter = { title: "Môn học", item: [] } } =
    useGetAllSubjectForFilterQuery();
  const onChangeKey = (e) => {
    setSerchOptions((preState) => ({ ...preState, key: e.target.value }));
  };
  const onChangeSearchOptions = (id, value) => {
    setSerchOptions((preState) => {
      const option = preState[id];
      if (option.find((i) => i === value) !== undefined)
        preState[id] = option.filter((i) => i !== value);
      else preState[id] = [...option, value];
      return preState;
    });
  };
  const resetSearchOptions = () => {
    setSerchOptions((preState) => ({
      key: preState.key,
      deepSearch: preState.deepSearch,
      fuzzySearch: preState.fuzzySearch,
      1: [],
      2: [],
      3: [],
      4: [],
    }));
  };

  const [searchSubjectDocument] = useSearchSubjectDocumentMutation();
  const onSearch = () => {
    setIsSearching(true);
    const params = {
      key: searchOptions.key,
      institute: searchOptions[1].join(","),
      subject: searchOptions[2].join(","),
      subjectDocumentType: searchOptions[3].join(","),
      semester: searchOptions[4].join(","),
      deepSearch: searchOptions.deepSearch,
      fuzzySearch: searchOptions.fuzzySearch,
    };
    searchSubjectDocument(params)
      .then((response) => {
        if (!response.error) {
          setResult(response.data);
        }
        setIsSearching(false);
      })
      .catch((error) => {
        setIsSearching(false);
      });
  };

  return (
    <Box bgcolor={"white"} width={"100%"} height={"100%"} overflow={"hidden"}>
      <Box width={"100%"} height={"calc(100%)"} display={"flex"}>
        <Box
          width={"400px"}
          sx={{
            borderRight: "1px solid #D8D9D9",
          }}
        >
          <Filter
            onChangeSearchOptions={onChangeSearchOptions}
            resetSearchOptions={resetSearchOptions}
            subjectDocumentTypes={subjectDocumentTypes}
            subjectDocumentFilter={subjectDocumentFilter}
            searchOptions={searchOptions}
          />
        </Box>
        <Box width={"calc(100% - 400px)"}>
          <Box
            height={"60px"}
            py={1}
            px={4}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box
              sx={{
                width: "calc(100% - 400px)",
                height: "100%",
                border: "1px solid #F1F3F4",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                px: 1,
                py: 0.75,
                fontSize: "18px",
                position: "relative",
                "&:focus-within ": {
                  boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 1.5px",
                },

                "& .MuiInputBase-input::placeholder": {
                  fontSize: "18px",
                },
              }}
            >
              <SearchIcon style={{ fontSize: "30px" }} />
              <InputBase
                placeholder={"Nhập key word để tìm kiếm tài liệu"}
                sx={{
                  width: "100%",
                  height: "100%",
                  fontSize: "18px",
                }}
                value={searchOptions.key}
                onChange={onChangeKey}
              />
              <Box pl={2}>
                <Button
                  onClick={onSearch}
                  variant="contained"
                  sx={{ borderRadius: 1, minWidth: "100px" }}
                >
                  Tìm kiếm
                </Button>
              </Box>
            </Box>
            <Stack direction={"row"} display={"flex"} alignItems={"center"}>
              <Typography variant="h5" fontWeight={"bold"}>
                Tìm kiếm mờ
              </Typography>
              <Tooltip title="Tìm kiếm gần đúng từ khóa">
                <Checkbox
                  value={searchOptions.fuzzySearch}
                  onChange={() =>
                    setSerchOptions((preState) => ({
                      ...preState,
                      fuzzySearch: !preState.fuzzySearch,
                    }))
                  }
                />
              </Tooltip>
            </Stack>
            <Stack direction={"row"} display={"flex"} alignItems={"center"}>
              <Typography variant="h5" fontWeight={"bold"}>
                Tìm kiếm đa ngôn ngữ
              </Typography>
              <Tooltip title="Tìm kiếm đa ngôn ngữ">
                <Checkbox
                  value={searchOptions.deepSearch}
                  onChange={() =>
                    setSerchOptions((preState) => ({
                      ...preState,
                      deepSearch: !preState.deepSearch,
                    }))
                  }
                />
              </Tooltip>
            </Stack>
          </Box>
          <Content result={result} isSearching={isSearching} />
        </Box>
      </Box>
    </Box>
  );
}

export default Search;
