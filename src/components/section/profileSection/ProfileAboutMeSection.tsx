import ProfileSectionContainer from "@/components/container/prfileContainer";
import { useProfileState } from "@/state/profileState";
import React from "react";

const ProfileAboutMeSection: React.FC = () => {
  const { personalData } = useProfileState();
  return (
    <ProfileSectionContainer delay={0.4}>
      <h4 className="border-b-1 w-full py-2 text-center text-darkPrimary dark:text-light text-lg font-bold">
        درباره من
      </h4>
      <p className="dark:bg-darkPrimary text-darkPrimary dark:text-light bg-light rounded-3xl p-5">
        {personalData?.description_myself ||
          "میتونی از بخش ویرایش این بخش و پر کنی"}
      </p>
    </ProfileSectionContainer>
  );
};

export default ProfileAboutMeSection;
