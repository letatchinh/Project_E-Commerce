import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material'
import React from 'react'

export default function MyPagination({count,page,onChange}) {
    const StyledPagination = styled(Pagination)({
        '& button': {
          background : 'white',
        }
        
      });
  return (
    <StyledPagination sx={{margin : '5px 0'}} showFirstButton showLastButton color='primary'  variant="outlined" shape="rounded" count={count} page={page} onChange={onChange} />
    )
}
