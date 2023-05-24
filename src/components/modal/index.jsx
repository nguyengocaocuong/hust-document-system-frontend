import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NewDocumentModal from './NewDocumentModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function CustomModal({type = '', modalData = {}, handleClose}) {
  return (
      <Modal
        open={modalData?.open}
        onClose={handleClose}
      >
        <Box sx={{...style}}>
           {type === 'ADD_SUBJECT_DOCUMENT' && <NewDocumentModal/>}
        </Box>
      </Modal>
  );
}