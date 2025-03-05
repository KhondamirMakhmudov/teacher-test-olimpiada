import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
const CreateSubjectModal = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [quizData, setQuizData] = useState({
    name: "",
    duration_in_minutes: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateQuiz = async () => {
    const token = session.accessToken; // Tokenni olish

    const response = await fetch(
      "https://app.iq-math.uz/api/v1/quiz/science/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizData),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.error("Xatolik:", data);
    } else {
      toast.success("Fan muvaffaqiyatli yaratildi");

      console.log("Muvaffaqiyatli yaratildi:", data);
      onClose();

      window.location.reload();
    }
  };

  if (!isOpen) return null; // Agar modal yopiq bo‘lsa, hech narsa qaytarmaydi

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Yangi fan qo&apos;shish</h2>

        <input
          type="text"
          name="name"
          value={quizData.name}
          onChange={handleChange}
          placeholder="Fan nomi"
          className="border p-2 w-full mb-3 rounded-md"
        />

        <input
          type="number"
          name="duration_in_minutes"
          value={quizData.duration_in_minutes}
          onChange={handleChange}
          placeholder="Davomiylik (daqiqa)"
          className="border p-2 w-full mb-3 rounded-md"
        />

        <input
          type="datetime-local"
          name="start_date"
          value={quizData.start_date}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded-md"
        />

        <input
          type="datetime-local"
          name="end_date"
          value={quizData.end_date}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded-md"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleCreateQuiz}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Yaratish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSubjectModal;
