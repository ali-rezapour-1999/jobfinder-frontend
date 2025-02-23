import React, { Suspense, useState } from "react";
import {
  Form,
  Input,
  SelectItem,
  Select,
  Textarea,
  Spinner,
} from "@heroui/react";
import { useProfileState } from "@/state/profileState";
import { ProfileResponse } from "@/type/profileStateType";
import toast, { Toaster } from "react-hot-toast";
import Btn from "@/components/ui/btn";

const genderOptions = [
  { id: 1, label: "مرد" },
  { id: 2, label: "زن" },
];

const ProfileUpdateSection: React.FC = () => {
  const { personalData, profileRequest, profileUpdate, isLoading } =
    useProfileState();
  const [updateData, setUpdateData] = useState<ProfileResponse>({
    age: personalData?.age || null,
    gender: personalData?.gender || "",
    state: personalData?.state || "",
    city: personalData?.city || "",
    address: personalData?.address || "",
    description_myself: personalData?.description_myself || "",
  });

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectChangeHandler = (name: keyof ProfileResponse, value: string) => {
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitProfileHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const updateResult = await profileUpdate(updateData);
    if (updateResult.status === 200) {
      toast.success(updateResult.message);
      profileRequest();
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex flex-col">
          <Spinner color="success" />
          <p>در حال پردازش اطلاعات...</p>
        </div>
      }
    >
      <Form
        className="w-full max-w-full flex flex-col gap-4"
        validationBehavior="native"
        onSubmit={onSubmitProfileHandler}
      >
        <div className="w-full h-max md:h-[100px] flex gap-8 flex-col md:flex-row justify-start items-start">
          <Input
            label="سن"
            labelPlacement="outside"
            placeholder="سن خود را وارد کنید"
            name="age"
            type="number"
            size="lg"
            value={updateData?.age || ""}
            onChange={inputChangeHandler}
          />

          <Select
            labelPlacement="outside"
            className="dark:text-light text-primary"
            size="lg"
            label={"جنسیت"}
            name="gender"
            placeholder={"جنسیت خود را وارد کنید"}
            value={updateData?.gender || ""}
            onSelectionChange={(keys) =>
              selectChangeHandler("gender", Array.from(keys)[0] as string)
            }
          >
            {genderOptions.map((item) => (
              <SelectItem
                key={item.label}
                className="dark:text-light text-primary"
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-full h-max md:h-[100px] flex gap-8 flex-col md:flex-row justify-start items-start">
          <Select
            labelPlacement="outside"
            className="dark:text-light text-primary"
            label={"استان"}
            size="lg"
            placeholder={"استان خود را وارد کنید"}
            name="state"
            value={updateData.state ?? ""}
            onSelectionChange={(keys) =>
              selectChangeHandler("state", Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="مازندران" className="dark:text-light text-primary">
              مازندران
            </SelectItem>
          </Select>

          <Select
            labelPlacement="outside"
            className="dark:text-light text-primary"
            label={"شهر"}
            size="lg"
            name="city"
            placeholder={"شهر خود را وارد کنید"}
            value={updateData.city ?? ""}
            onSelectionChange={(keys) =>
              selectChangeHandler("city", Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="بابل" className="dark:text-light text-primary">
              بابل
            </SelectItem>
          </Select>
        </div>

        <Input
          label="آدرس"
          labelPlacement="outside"
          name="address"
          placeholder={updateData.address ?? ""}
          type="text"
          size="lg"
          className="font-light"
          value={updateData.address ?? ""}
          onChange={inputChangeHandler}
        />

        <Textarea
          label="درباره من"
          disableAnimation
          disableAutosize
          name="description_myself"
          classNames={{
            base: "w-full mt-5",
            input: "resize-y h-[150px] max-h-[150px] font-light",
          }}
          placeholder={
            updateData?.description_myself ||
            "چند کلمه در مورد خودتون توضیح بدید"
          }
          value={updateData?.description_myself || ""}
          size="lg"
          onChange={(e) =>
            setUpdateData((prev) => ({
              ...prev,
              description_myself: e.target.value,
            }))
          }
        />

        <Btn type="submit" className="w-full text-lg mt-3 ">
          {isLoading ? <Spinner /> : "ثبت تغییرات"}
        </Btn>
      </Form>
      <Toaster position="top-right" />
    </Suspense>
  );
};

export default ProfileUpdateSection;
