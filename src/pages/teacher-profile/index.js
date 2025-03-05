import Dashboard from "@/components/dashboard";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { get } from "lodash";
import Link from "next/link";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import EditIcon from "@/components/icons/edit";

const Index = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hide, setHide] = useState(false);

  const {
    data: studentProfile,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken, // Only fetch if accessToken is available
  });

  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px] z-10  relative h-[125px] `}
      >
        <div className={"space-y-[15px] z-20"}>
          <p className={"text-[18px] dark:text-white text-black font-semibold"}>
            {t("userProfile")}
          </p>

          <div className="flex gap-x-[12px] items-center">
            <Link href={"/"} className="text-[#5A6A85BF] dark:text-gray-200">
              {t("homePage")}
            </Link>
            <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
            <p className="text-black dark:text-white">{t("myPage")}</p>
          </div>
        </div>

        <div className={"absolute right-[40px] bottom-0 -z-10"}>
          <Image
            src={"/icons/user-profile-bg.svg"}
            alt={"user-profile-bg"}
            width={168}
            height={165}
            className="md:blur-0 blur-sm"
          />
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="col-span-full sm:col-span-2 lg:col-span-7 bg-white dark:bg-[#26334AFF] border border-[#EAEFF4] dark:border-[#2A3447FF] rounded-md">
          <div className="flex justify-between items-center p-6">
            <h3 className="capitalize text-lg font-semibold text-black dark:text-white">
              {t("details")}
            </h3>
            <ul className="flex gap-4">
              <li>
                <Image
                  src="/icons/Edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                />
              </li>
              <li>
                <Image
                  src="/icons/View.svg"
                  alt="view"
                  width={24}
                  height={24}
                />
              </li>
              <li>
                <Image
                  src="/icons/Share.svg"
                  alt="share"
                  width={24}
                  height={24}
                />
              </li>
            </ul>
          </div>

          <div className="w-full h-[1px] bg-[#EAEFF4] mb-6"></div>

          <div className="p-6">
            <div className="flex sm:flex-wrap flex-col sm:flex-row gap-4">
              <Image src="/icons/user.svg" alt="user" width={70} height={70} />
              <div className="space-y-1 text-black dark:text-white">
                <h4>{get(studentProfile, "data.full_name")}</h4>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  {t("educationalInstitution")}{" "}
                  <span className="capitalize">
                    {get(studentProfile, "data.academy_or_school")}
                  </span>
                </p>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  {get(studentProfile, "data.class_name")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-[30px] my-6 text-black dark:text-white">
              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  {t("phone number")}
                </p>
                <p>+{get(studentProfile, "data.phone")}</p>
              </div>

              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  {t("email")}
                </p>
                <p>{get(studentProfile, "data.email")}</p>
              </div>
              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  {t("birthday")}
                </p>
                <p>
                  {dayjs(get(studentProfile, "data.brithday")).format(
                    "DD.MM.YYYY"
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  {t("region")}
                </p>
                <p>{get(studentProfile, "data.region")}</p>
              </div>
              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  {t("district")}
                </p>
                <p>{get(studentProfile, "data.districts")}</p>
              </div>
              <div className="col-span-full">
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  {t("address")}
                </p>
                <p>{get(studentProfile, "data.address")}</p>
              </div>

              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  Hujjat turi
                </p>
                <p>{get(studentProfile, "data.document_type")}</p>
              </div>

              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  Hujjat
                </p>
                <p>{get(studentProfile, "data.document")}</p>
              </div>

              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  O&apos;quv dargohi nomi
                </p>
                <p>{get(studentProfile, "data.academy_or_school_name")}</p>
              </div>
              <div>
                <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                  Ta&apos;lim tili
                </p>
                <p>{get(studentProfile, "data.type_of_education")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-full sm:col-span-2 lg:col-span-5 bg-white dark:bg-[#26334AFF] border border-[#EAEFF4] dark:border-[#2A3447FF] rounded-md">
          <div className="flex justify-between items-center p-6">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {t("confidentiality")}
            </h3>
            <button
              className="scale-100 active:scale-90 transition-all duration-200"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <Image src="/icons/eye.svg" alt="show" width={24} height={24} />
              ) : (
                <Image
                  src="/icons/eye-closed.svg"
                  alt="hide"
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>

          <div className="w-full h-[1px] bg-[#EAEFF4]"></div>

          <div className="p-6">
            <div className="flex flex-col py-3 space-y-2 text-black dark:text-white">
              <label>{t("yourLogin")}</label>
              <input
                type={showPassword ? "text" : "password"}
                disabled
                value={session?.login}
                className="w-full sm:w-1/2 py-2 px-3 dark:text-white rounded-md border bg-transparent"
              />
            </div>

            <div className="flex flex-col space-y-2 text-black dark:text-white">
              <label>{t("yourPassword")}</label>
              <input
                type={showPassword ? "text" : "password"}
                disabled
                value={session?.password}
                className="w-full sm:w-1/2 py-2 px-3 rounded-md border bg-transparent"
              />
            </div>

            <div className="mt-10">
              <p className="text-sm mb-2 text-[#7C8FAC] dark:text-gray-200">
                {t("wantToChangePassword")}
              </p>
              <Link href="/auth/forget-password">
                <button className="flex items-center gap-2 bg-[#539BFF] scale-100 active:scale-95 hover:bg-[#5197F9] transition-all duration-200 text-white py-2 px-4 rounded-md">
                  {t("changePassword")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
