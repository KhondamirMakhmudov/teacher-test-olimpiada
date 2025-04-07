import Dashboard from "@/components/dashboard";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import StudentsIcon from "@/components/icons/students";
import CheckedIcon from "@/components/icons/checked";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useRouter } from "next/router";
import LineChart from "@/components/charts/line-chart";
import DonutChart from "@/components/charts/donut";
import TestStatisticsChart from "@/components/charts/bar-chart";
import RevenueChart from "@/components/barchart";
import BarChart from "@/components/charts/bar-chart";
import RegistrationChart from "@/components/charts/bar-chart";
import SimpleLoader from "@/components/loader/simple-loader";
import ActiveUsers from "@/components/icons/active-user";
const Index = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: session } = useSession();
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
    enabled: !!session?.accessToken,
  });

  const {
    data: stats,
    isLoading: isLoadingStats,
    isFetching: isFetchingStats,
  } = useGetQuery({
    key: KEYS.stats,
    url: URLS.stats,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken,
  });

  console.log("stats", get(stats, "data.telegram_user"));

  const {
    data: passedRegistration,
    isLoading: isLoadingPassedRegistration,
    isFetching: isFetchingPassedRegistration,
  } = useGetQuery({
    key: KEYS.passedRegistration,
    url: URLS.passedRegistration,
  });

  const {
    data: activeUsers,
    isLoading: isLoadingActiveUsers,
    isFetching: isFetchingActiveUsers,
  } = useGetQuery({
    key: KEYS.activeUsers,
    url: URLS.activeUsers,
  });

  // const { data: telegramBotUsersList } = useGetQuery({
  //   key: KEYS.telegramBotUsersList,
  //   url: URLS.telegramBotUsersList,
  // });
  return (
    <Dashboard>
      <div className="grid grid-cols-12 gap-6 my-6 md:my-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="col-span-12 md:col-span-9 p-6 md:p-10 bg-gradient-to-r from-[#E0ECFD] to-[#EBF3FE] dark:from-[#202A40] dark:to-[#26334A] rounded-xl relative min-h-[220px] shadow-lg"
        >
          <div className="space-y-6 md:space-y-10">
            <div className="flex items-center gap-4">
              <Image
                src="/icons/Avatar.svg"
                alt="welcome"
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <p className="text-lg md:text-2xl font-semibold text-black dark:text-white">
                {t("welcome")}! {get(studentProfile, "data.full_name")}
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  {isLoadingStats || isFetchingStats ? (
                    <SimpleLoader />
                  ) : (
                    <div className="text-4xl font-semibold text-black dark:text-white">
                      <CountUp
                        end={get(stats, "data.register_student")}
                        duration={3}
                      />
                    </div>
                  )}
                  <StudentsIcon color="green" />
                </div>
                <p className="text-base text-black dark:text-white">
                  O'quvchilar soni
                </p>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-semibold text-black dark:text-white">
                    <CountUp end={300} duration={3} />
                  </div>
                  <CheckedIcon color="green" />
                </div>
                <p className="text-base text-black dark:text-white">
                  Imtihon savollari
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-semibold text-black dark:text-white">
                    <div className="text-4xl font-semibold text-black dark:text-white">
                      <CountUp
                        end={get(activeUsers, "data.active_users")}
                        duration={3}
                      />
                    </div>
                  </div>
                  <ActiveUsers color="green" />
                </div>
                <p className="text-base text-black dark:text-white">
                  Faol foydalanuvchilar
                </p>
              </div>
            </div>
          </div>
          <div className="absolute right-4 bottom-0 w-[130px] md:w-[270px] lg:w-[326px]">
            <Image
              src="/icons/welcome-bg-admin.svg"
              alt="welcome"
              width={326}
              height={96}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Telegram Bot Users Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="col-span-12 md:col-span-3 bg-cover bg-center bg-no-repeat dark:bg-[#26334A] border dark:border-0 shadow-lg rounded-xl flex items-center justify-center p-5 relative backdrop-blur-md"
          style={{ backgroundImage: "url(/images/telegram_bot.jpg)" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
          <div className="relative text-center text-white">
            <div className="text-3xl font-semibold">
              <CountUp
                end={get(stats, "data.telegram_user", [])}
                duration={3}
              />
            </div>
            <p className="text-lg">
              Telegram botdan ro'yhatdan o'tgan foydalanuvchilar
            </p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div className="col-span-12  flex gap-[30px] flex-wrap lg:flex-nowrap  bg-white dark:bg-[#1E293B]  rounded-xl ">
          <div className="flex-1 min-w-[250px]">
            <RevenueChart />
          </div>

          <div className="flex-1 min-w-[250px]">
            <DonutChart />
          </div>
          <div className="md:flex- flex-1 space-y-[20px]">
            <RegistrationChart
              webCount={
                isLoadingPassedRegistration || isFetchingPassedRegistration ? (
                  <SimpleLoader />
                ) : (
                  get(stats, "data.register_student")
                )
              }
            />
            <div className="relative bg-[#F2ECF9] dark:bg-[#8A49DE] rounded-lg p-8 shadow-lg flex flex-col items-start">
              <h3 className="text-[#5A6A85] dark:text-white text-lg font-semibold">
                Registratsiyani <br /> o'zgartirish <br /> imkoniyati
              </h3>
              <button
                onClick={() => router.push("/registration-date")}
                className="mt-4 bg-[#763EBD] hover:bg-[#8A49DE] dark:hover:bg-[#612CA6] text-white py-3 px-5 rounded-md transition-all duration-200 text-sm"
              >
                O'zgartirish
              </button>
              <div className="absolute -right-4 top-0 opacity-80">
                <Image
                  src="/icons/register-img.svg"
                  alt="welcome"
                  width={180}
                  height={180}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Registration Change Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="col-span-12 md:col-span-6 lg:col-span-3 space-y-6"
        ></motion.div>
      </div>
    </Dashboard>
  );
};

export default Index;
