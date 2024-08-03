import Account from "@/app/(main)/settings/account/page";
import React from "react";
import SettingDialog from "../../SettingDialog";

const DialogMe = () => {
  return (
    <SettingDialog>
      <Account />;
    </SettingDialog>
  );
};

export default DialogMe;
