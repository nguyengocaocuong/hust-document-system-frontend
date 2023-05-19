import { Box, Drawer } from '@mui/material'
import React, { useState } from 'react'

function Notification({isShow, toggle}) {
  return (
    <Drawer
        anchor='right'
        open={isShow}
        onClose={toggle}
    >
        <Box width={'400px'} height={'100vh'} bgColor={'red'}>

        </Box>
    </Drawer>
  )
}

export default Notification