import { createTheme, Grid, Stack } from '@mui/material'
import React from 'react'
import ProductClient from './ProductClient'
import { v4 } from "uuid";
import MyPagination from './MyPagination';
import { ThemeProvider } from '@mui/system';
const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 900,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
  });
export default function ListProduct({data,pages,page,handleChange}) {
    
  return (
   <ThemeProvider theme={theme}>
        <Stack>
          <Grid container spacing={1} width='100%'>
            {data &&
              data.map((e) => (
                <Grid className="abc" key={v4()} xs={6} md={3}  sm={6} item>
                  <ProductClient item={e} />
                </Grid>
              ))}
          </Grid>
          <Stack alignItems="center" spacing={2} sx={{ marginTop: "20px" }}>
            <MyPagination
              count={pages}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
   </ThemeProvider>
  )
}
