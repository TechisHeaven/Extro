import { getUser } from "@/actions/auth/action";
import React, { Suspense } from "react";
import SettingsMeForm from "./SettingsMeForm";

export default async function SettingsMe() {
  const user = await getUser();

  return (
    <Suspense fallback={"loading form"}>
      <SettingsMeForm user={user} />
    </Suspense>
  );
}
