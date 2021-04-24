import { editProfileFormName, editProfileFormAbout } from "./constants.js";

export const setUserInfoFromProfile = (userInfo) => {
  editProfileFormName.value = userInfo.name;
  editProfileFormAbout.value = userInfo.about;
};
