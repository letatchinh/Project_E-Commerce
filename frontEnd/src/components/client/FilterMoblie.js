
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ItemFilter from './ItemFilter';
import { useSelector } from 'react-redux';

export default function FilterMoblie() {
  const mainBackGround = useSelector(state => state.colorCommon.mainBackGround)
    const [state, setState] = useState({
        left: false,
      });
    const toggleDrawer = (anchor, open) => () => {
        setState({ ...state, [anchor]: open });
      };
    const list = () => (
        <Box
          sx={{ width:  300 , background : mainBackGround,height : '100%'}}
          role="presentation"
        >
         <ItemFilter />
        </Box>
      );
  return (
    <div>
     
       
          <Button onClick={toggleDrawer('left', true)}>
        <div style={{background : '#1976d2',color : 'white',padding : '7px 10px',borderRadius : '5px'}}><FilterAltIcon/></div>

          </Button>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
    
    </div>
  )
}
