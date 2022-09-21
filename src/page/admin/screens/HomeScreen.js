import React, { useState } from "react";
import Header from "./../../../layout/admin/Header";
import Sidebar from "./../../../layout/admin/sidebar";
import Main from "./../../../components/admin/Home/main";
const HomeScreen = () => {
  const [isClick, setClick] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const handleClickMenu = (e) => {
    setClick(!isClick);
  };
  const handleDisplay = (e) => {
    setDisplay(!isDisplay);
  };
  return (
    <>
      <Sidebar click={isClick} handleClickMenu={handleClickMenu} />
      <div className={isClick ? "aside-mini" : ""}>
        <main className="main-wrap">
          <Header
            handleClickMenu={handleClickMenu}
            isDisplay={isDisplay}
            handleDisplay={handleDisplay}
          />
          <Main />
        </main>
      </div>
    </>
  );
};

export default HomeScreen;
