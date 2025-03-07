import Dashboard from "@/components/dashboard";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import TrashIcon from "@/components/icons/trash";
import EditIcon from "@/components/icons/edit";
import useDeleteQuery from "@/hooks/api/useDeleteQuery";
import usePutQuery from "@/hooks/api/usePutQuery";
import usePostQuery from "@/hooks/api/usePostQuery";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreateSubjectModal from "@/components/modal/createSubjectModal";
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration_in_minutes: "",
    start_date: "",
    end_date: "",
  });

  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.olimpiadaQuizList,
    url: URLS.olimpiadaQuizList,
  });

  const { mutate: deleteQuiz, isLoadingDelete } = useDeleteQuery({
    listKeyId: "delete-subject",
  });

  const handleCreateQuiz = async () => {
    const token = session.accessToken; // Tokenni olish

    const response = await fetch(
      "https://test.iq-math.uz/api/v1/quiz/science/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: "Matematika Olimpiadasi",
          duration_in_minutes: 60,
          start_date: "2024-03-01T08:00:00",
          end_date: "2024-03-01T10:00:00",
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.error("Xatolik:", data);
    } else {
      console.log("Muvaffaqiyatli yaratildi:", data);
    }
  };

  const handleDelete = (quizId) => {
    deleteQuiz(`https://test.iq-math.uz/api/v1/quiz/science/delete/${quizId}/`);
  };

  const handleOpenEditModal = async (quizId) => {
    const token = session.accessToken;

    const response = await fetch(
      `https://test.iq-math.uz/api/v1/quiz/science/update/${quizId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Ma’lumotni olishda xatolik");
      return;
    }

    const data = await response.json();
    setSelectedQuiz(quizId); // ID ni saqlaymiz
    setFormData({
      name: data.name,
      duration_in_minutes: data.duration_in_minutes,
      start_date: data.start_date,
      end_date: data.end_date,
    });

    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditQuiz = async () => {
    if (!selectedQuiz) return;

    const token = session.accessToken;

    const response = await fetch(
      `https://test.iq-math.uz/api/v1/quiz/science/update/${selectedQuiz}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.error("Xatolik:", data);
    } else {
      console.log("Muvaffaqiyatli yangilandi:", data);
      setModalOpen(false);
    }
  };

  return (
    <Dashboard>
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={"bg-[#539BFF] px-[20px] py-[10px] text-white rounded-md"}
        >
          Fan qo&apos;shish
        </button>

        <CreateSubjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      {get(data, "data", []).map((item) => (
        <div
          key={get(item, "id")}
          className="px-6 mb-6 md:px-4 md:mb-4 sm:px-2 sm:mb-2 rounded-lg max-w-2xl border p-[30px] font-medium my-[30px]"
        >
          <h1 className="text-2xl text-center dark:text-white text-black">
            {get(item, "name")}
          </h1>
          <div>
            <div className=" flex flex-wrap justify-between md:grid grid-cols-3 lg:place-items-center place-items-start gap-4 md:gap-3 sm:gap-2 my-4 md:my-3 sm:my-2">
              {[
                {
                  label: "leadTime",
                  color: "#539BFF",
                  value: `${get(item, "duration_in_minutes", "")} ${t(
                    "minut"
                  )}`,
                },
                {
                  label: "startDate",
                  color: "#12DEB9",
                  value: dayjs(get(item, "start_date", "")).format(
                    "DD.MM.YYYY"
                  ),
                  time: dayjs(get(item, "start_date", "")).format("HH:mm"),
                },
                {
                  label: "endDate",
                  color: "#EB0000",
                  value: dayjs(get(item, "end_date", "")).format("DD.MM.YYYY"),
                  time: dayjs(get(item, "end_date", "")).format("HH:mm"),
                },
              ].map(({ label, color, value, time }) => (
                <div
                  key={label}
                  className="col-span-1 flex lg:items-baseline  gap-x-3 md:gap-x-2 sm:gap-x-1"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>
                    <h3 className="text-[#868EAB] dark:text-gray-200 text-sm sm:text-xs">
                      {t(label)}
                    </h3>
                    <div className="flex gap-x-[5px] items-center">
                      <p className="font-semibold text-lg dark:text-white text-black md:text-base sm:text-sm">
                        {value}
                      </p>
                      <p
                        className={`font-semibold !text-sm  dark:text-white !text-gray-300  md:text-base sm:text-sm`}
                      >
                        {time}
                      </p>{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-x-[10px]">
              <button
                onClick={() =>
                  router.push(`tests/quizzes-teacher/${get(item, "id")}`)
                }
                className="py-2 w-full px-4 bg-[#12DEB9] rounded text-white text-sm md:text-base sm:text-sm hover:bg-[#4570EA] transition-all duration-300"
              >
                {t("questions")}
              </button>
              <button
                onClick={() => handleOpenEditModal(get(item, "id"))}
                className="bg-[#539BFF] px-[10px] py-[10px] rounded-md"
              >
                <EditIcon color="white" />
              </button>
              <button
                onClick={() => handleDelete(get(item, "id"))}
                className="bg-[#FA896BFF] px-[10px] py-[10px] rounded-md"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        </div>
      ))}

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Fanni tahrirlash</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Quiz nomi"
            />
            <input
              type="number"
              name="duration_in_minutes"
              value={formData.duration_in_minutes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Davomiyligi (daqiqa)"
            />
            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="datetime-local"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleEditQuiz}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Saqlash
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default Index;
