import usePutQuery from "@/hooks/api/usePutQuery";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useState, useEffect } from "react";
import { get } from "lodash";
import toast from "react-hot-toast";

const FilterStudentModal = ({ isOpen, onClose }) => {
  const [count, setCount] = useState("");

  const {
    data: filterStudentCount,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: "filter-student-count",
    url: URLS.filterStudentCount,
  });

  const { mutate: filterStudent } = usePutQuery({
    listKeyId: "filter-student-count", // TO‘G‘RI YOZILDI
  });

  useEffect(() => {
    if (filterStudentCount) {
      setCount(get(filterStudentCount, "data.count", ""));
    }
  }, [filterStudentCount]);

  const onSubmit = (e) => {
    e.preventDefault(); // Sahifa yangilanishining oldini olish

    console.log("Yuborilayotgan qiymat:", count); // Kiritilgan sonni tekshirish

    filterStudent(
      {
        url: URLS.filterStudentCount,
        attributes: {
          count: parseInt(count, 10),
        },
      },
      {
        onSuccess: () => {
          console.log("✅ Muvaffaqiyatli:"); // API javobini tekshirish
          toast.success("Saralandi");
          onClose();
        },
        onError: (error) => {
          console.error("❌ Xatolik:", error?.response || error); // Xato xabarini ko‘rsatish
          toast.error(`Xatolik: ${error?.message || "Noma'lum xato"}`);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Modal tashqarisiga bosganda yopish
    >
      <div
        className="bg-white p-6 rounded-lg w-2/5"
        onClick={(e) => e.stopPropagation()} // Modal ichiga bosganda yopilmasligi uchun
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold">O&apos;quvchi saralash</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="my-[30px] space-y-[15px] flex flex-col"
        >
          <label>O&apos;quvchi sonini kiriting</label>

          <input
            className="w-1/2 border px-[16px] py-[10px] rounded-[12px]"
            placeholder="Kiriting"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />

          <button
            type="submit"
            className="px-[16px] py-[10px] text-white bg-[#5D87FF] float-right rounded-md"
          >
            {isLoading || isFetching ? "Yuklanmoqda..." : "Yuborish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterStudentModal;
