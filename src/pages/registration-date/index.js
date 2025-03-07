import Dashboard from "@/components/dashboard";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import usePutQuery from "@/hooks/api/usePutQuery";
import dayjs from "dayjs";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [dates, setDates] = useState({
    start_date: "",
    end_date: "",
  });
  const {
    data: registerDate,
    isLoading: isLoadingRegisterDate,
    isFetching: isFetchingRegisterDate,
  } = useGetQuery({
    key: KEYS.registerDate,
    url: URLS.registerDate,
  });

  const { mutate: changeRegisterDate, isLoading } = usePutQuery({
    listKeyId: ["register_dates"],
  });

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeRegisterDate(
      {
        url: "https://test.iq-math.uz/api/v1/student/register_date/update/1/",
        attributes: dates,
      },
      {
        onSuccess: () => {
          setIsOpen(false); // ✅ Close modal on success
          toast.success("Registratsiya sanasi o'zgartirildi!"); // ✅ Show toast
        },
        onError: () => {
          toast.error("Failed to update register dates."); // ❌ Show error toast
        },
      }
    );
  };

  console.log(get(registerDate, "data", []));

  return (
    <Dashboard>
      <div className="px-6 mb-6 md:px-4 md:mb-4 sm:px-2 sm:mb-2 rounded-lg max-w-lg border p-[30px] font-medium my-[30px]">
        <h1 className="text-2xl text-center dark:text-white text-black">
          Ro'yxatdan o'tish sanasi
        </h1>

        {get(registerDate, "data", []).map((item) => (
          <div
            key={get(item, "id")}
            className="col-span-1 flex flex-col lg:items-baseline  gap-x-3 md:gap-x-2 sm:gap-x-1"
          >
            <div className="w-2.5 h-2.5 rounded-full"></div>
            <div className="flex gap-x-[15px] mt-[15px]">
              <h3 className="text-[#868EAB] dark:text-gray-200">
                Boshlanish vaqti:
              </h3>
              <div className="flex gap-x-[10px] items-center">
                <p className="text-[#1C1C1C] dark:text-white">
                  {dayjs(get(item, "start_date", "")).format("DD.MM.YYYY")}{" "}
                </p>
                <p className="text-sm">
                  {dayjs(get(item, "start_date", "")).format("HH:mm")}
                </p>
              </div>
            </div>

            <div className="flex gap-x-[15px] mt-[15px]">
              <h3 className="text-[#868EAB] dark:text-gray-200">
                Tugash vaqti:
              </h3>
              <div className="flex gap-x-[10px] items-center">
                <p className="text-[#1C1C1C] dark:text-white">
                  {dayjs(get(item, "end_date", "")).format("DD.MM.YYYY")}
                </p>
                <p className="text-sm">
                  {dayjs(get(item, "end_date", "")).format("HH:mm")}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="py-2 w-full px-4 bg-[#5D87FF] rounded text-white text-sm md:text-base sm:text-sm hover:bg-[#4570EA] transition-all duration-300 mt-[20px]"
            >
              Ro&apos;yxatdan o&apos;tish vaqtini belgilash
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-[#26334AFF] p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-black">
              Ro&apos;yxatdan o&apos;tish vaqtini belgilash
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <h3 className="text-[#868EAB] dark:text-gray-200">
                Boshlanish vaqti:
              </h3>
              <input
                type="datetime-local"
                name="start_date"
                value={dates.start_date}
                onChange={handleChange}
                className="border p-2 rounded bg-transparent dark:text-white text-black"
                required
              />

              <h3 className="text-[#868EAB] dark:text-gray-200">
                Tugash vaqti
              </h3>
              <input
                type="datetime-local"
                name="end_date"
                value={dates.end_date}
                onChange={handleChange}
                className="border p-2 rounded bg-transparent dark:text-white text-black"
                required
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading} // Prevent closing during update
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Yangilanyapti..." : "Yangilash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default Index;
