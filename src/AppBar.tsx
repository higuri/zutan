// AppBar.tsx

import React from 'react';
import styled from 'styled-components'
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

// AppToolbar
const AppToolbar = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
` as any;

// AppBar
const AppBar = (props) => (
  <MUIAppBar position="static">
    <AppToolbar>
      <IconButton
        color="inherit"
        onClick={props.onClickMyZutan}>
        <PhotoLibraryIcon />
      </IconButton>
      <IconButton color="inherit"
        onClick={props.onClickHome}>
        <HomeIcon />
      </IconButton>
    </AppToolbar>
  </MUIAppBar>
);

export default AppBar;
