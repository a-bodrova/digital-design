import React from 'react';
import { observer } from 'mobx-react-lite';
import Auth from '../../components/auth/Auth';

const Start = observer(() => {

  return (
    <Auth />
  );
});

export default Start;