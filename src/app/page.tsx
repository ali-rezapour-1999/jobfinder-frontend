"use client";

import MainNavBar from "@/components/nav/navbar";
import HomeSectionSearch from "@/components/search/homeSectionSearch";
import ProfileAboutMeSection from "@/components/section/ProfileAboutMeSection";
import ProfileSection from "@/components/section/profileSection";
import ProfileViewSection from "@/components/section/profileViewSection";

const Home = () => {
  return (
    <main>
      <MainNavBar />
      <div className="w-full h-full flex px-10 gap-5 mt-5 ">
        <section className="hidden md:flex md:w-4/12 xl:w-3/12"></section>
        <section className="w-full md:w-8/12 xl:w-6/12 mt-4">
          <HomeSectionSearch />
        </section>
        <section className="hidden xl:flex flex-col xl:w-3/12 overflow-hidden px-4">
          <ProfileSection />
          <ProfileViewSection />
          <ProfileAboutMeSection />
        </section>
      </div>
    </main>
  );
};

export default Home;
