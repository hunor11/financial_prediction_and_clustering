//mCreate a BaseBox component for the pages with 90 vh and display flex

import React from 'react';
import { Box } from '@mui/material';

const BaseBox = ({children}) => {
  return (
    <Box 
      className="base"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      height={'90vh'}
    >
      {children}
    </Box>
  )
}

export default BaseBox;