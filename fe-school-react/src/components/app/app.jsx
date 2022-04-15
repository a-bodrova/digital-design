import React from "react";
import Archive from "../../pages/archive/archive";
import Main from "../../pages/main/main";
import { AppRoute } from "../../const";
import Form from "../../pages/form/form";


const App = () => {
  return (
    <Main mode={AppRoute.MAIN} />
    // <Archive mode={AppRoute.ARCHIVE} />
    // <Form mode={AppRoute.FORM} />
  )
}

export default App;
