import { Box, Chip } from "@mui/material";
import React, { useState } from "react";
import DocumentDetailAction from "./DocumentDetailAction";
import Comment from "../comment";
import DocumentDetailtAnswer from "./DocumentDetailAnswer";
import Owner from "../Owner";
import TranslateLanguage from "../TranslateLanguage";
import PropperMenu from "../PropperMenu";
import { useDispatch } from "react-redux";
import { openReportModal } from "../../store/modalState";
import { useParams } from "react-router-dom";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import FlagIcon from "@mui/icons-material/Flag";

function DocumentDetailInfo({
  owner = {},
  objectName,
  comments = {},
  answers = {},
  favorites = {},
  createdAt,
  language = {},
  copyUrl = () => {},
}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(1);
  const handleSelectedId = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const reportSubjectDocument = () => {
    dispatch(
      openReportModal({
        subjectId: id,
      })
    );
  };
  const actions = () => [
    {
      Icon: FlagIcon,
      label: "Báo cáo tài liệu",
      action: reportSubjectDocument,
    },
    { Icon: CopyAllIcon, label: "Copy link truy cập", action: copyUrl },
  ];
  return (
    <Box width={`30%`} borderBottom="1px solid #D8D9D9" pb={2}>
      <Owner
        owner={owner}
        createdAt={createdAt}
        listItem={[
          <Chip
            key={1}
            label={objectName}
            size="small"
            sx={{ maxWidth: "100px" }}
            color="info"
          />,
          <PropperMenu key={2} action={actions()} />,
        ]}
      />
      <DocumentDetailAction
        handleSelectedId={handleSelectedId}
        selectedId={selectedId}
        totalComment={comments.data.length}
        totalAnswer={answers.data.length}
        favorite={favorites}
      />
      <Box
        width="100%"
        height={"calc(100% - 180px)"}
        maxHeight={"calc(100% - 180px)"}
        overflow={"hidden"}
        mt={1}
      >
        {selectedId === 3 ? (
          <TranslateLanguage
            value={language.value}
            onClick={language.select}
            reset={language.reset}
          />
        ) : selectedId === 2 ? (
          <Comment comments={comments} />
        ) : (
          <DocumentDetailtAnswer answers={answers} />
        )}
      </Box>
    </Box>
  );
}

export default DocumentDetailInfo;
