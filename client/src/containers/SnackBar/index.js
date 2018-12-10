import React from 'react'
import { SnackbarProvider, withSnackbar } from 'notistack';

import Page from '../Page'


const MyPage = withSnackbar(Page);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyPage />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;