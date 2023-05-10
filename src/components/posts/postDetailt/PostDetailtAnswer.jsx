import { Box, Stack } from '@mui/material'
import React from 'react'
import PostCardAnswer from '../postCardAnswer'

function PostDetailtAnswer() {
  return (
    <Box width={'100%'} pr={2} pl={2}>
        <Stack spacing={1}>
          {Array.from({length: Math.round(Math.random()*10)}, () => Math.random()).map((value, index)=>(
            <PostCardAnswer key={index} data={{
              owner: {
                name: "Nguyễn Ngô Cao Cường",
                avatar:
                  "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954__340.jpg",
              },
              createAt: "28/10/2000",
              view: Math.round(Math.random()*1000),
              favorite: Math.round(Math.random()*600),
              rate: (Math.random() * 5).toFixed(1),
              description: 'Mọi người tham khảo nhé, mình cũng không chắc lắm',
              content: "",
              document: {}
            }}/>
          ))}
        </Stack>
    </Box>
  )
}

export default PostDetailtAnswer