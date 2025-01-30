"use client";

import React from "react";
import {
  Tabs,
  Tab,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Bookmark } from "lucide-react";
import DescriptionForJob from "../section/descriptionForJob";
import JobOwnerDetial from "../section/jobOwnerDetail";

interface JobDetialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryItemTempalte = ({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) => {
  return (
    <div className="flex flex-col shadow w-full justify-center items-center rounded-2xl bg-light overflow-hidden">
      <span className="bg-primary py-2 text-center w-full text-light">
        {title}
      </span>
      <span className="bg-light px-5 py-2 text-primary">{detail}</span>
    </div>
  );
};

const JobDetailDrawer: React.FC<JobDetialDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer
      placement="right"
      isOpen={isOpen}
      size="5xl"
      backdrop="blur"
      onClose={onClose}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader>
              <section className="flex items-center justify-between w-full border-b-1 pb-2">
                <div className="flex items-center ">
                  <Image
                    src={logo}
                    alt="job request profile"
                    width={100}
                    height={100}
                    className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] object-contain"
                  />
                  <div className="flex flex-col gap-2 mx-2">
                    <h4 className="text-md md:text-xl font-bold">
                      طراحی سایت جرقه
                    </h4>
                    <h6 className="text-sm">برنامه نویسی و حوضه های وابسته</h6>
                  </div>
                </div>
                <Button className="px-0 min-w-10 rounded-2xl">
                  <Bookmark />
                </Button>
              </section>
            </DrawerHeader>
            <DrawerBody>
              <section className="w-full ">
                <section className="flex flex-col lg:flex-row justify-between items-center my-5 px-2 gap-3 border-b-1 pb-5">
                  <CategoryItemTempalte
                    title="دسته بندی"
                    detail="برنامه نویسی"
                  />
                  <CategoryItemTempalte
                    title="موقعیت مکانی"
                    detail="مازندران / بابل"
                  />
                  <CategoryItemTempalte
                    title="زمان مورد نیاز روزانه"
                    detail="۱ الی ۴ ساعت"
                  />
                </section>
                <section className="w-full">
                  <Tabs
                    className="w-full drawer-job-content-select max-w-full"
                    aria-label="drawer-job-content-select"
                    radius="full"
                  >
                    <Tab
                      key="desiptionConponents"
                      className="w-full"
                      title="توضیحات"
                    >
                      <DescriptionForJob />
                    </Tab>
                    <Tab key="jobOwnerDetial" title="درباره ثبت کننده ">
                      <JobOwnerDetial />
                    </Tab>
                  </Tabs>
                </section>
              </section>
            </DrawerBody>
            <DrawerFooter className="flex justify-center items-center">
              <Button className="w-full rounded-2xl bg-primary text-light text-lg">
                درخواست همکاری
              </Button>

              <Button
                color="danger"
                className="bg-red-700 text-light rounded-2xl"
                onPress={onClose}
              >
                بستن
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default JobDetailDrawer;
