import React from 'react';
// import styles from './start.module.scss';
// import { useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';
// import Header from '../../components/header/header';
import Auth from '../../components/auth/Auth';

const Start = observer(() => {

  // const { pathname } = useLocation();

  return (
      // <Header path={ pathname } />
      <Auth />
  );
});

export default Start;