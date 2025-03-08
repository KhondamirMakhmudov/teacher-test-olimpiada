import usePatchQuery from "@/hooks/api/usePatchQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { get, isEmpty } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import TrashIcon from "@/components/icons/trash";
import toast from "react-hot-toast";

const RemoveStudentModal = ({ isOpen, onClose }) => {
  const { data: resultDeleteStudent } = useGetQuery({
    key: KEYS.resultDeleteStudent,
    url: URLS.resultDeleteStudent,
  });

  const { mutate: deleteStudent } = usePatchQuery({
    listKeyId: "add-student",
  });

  const onSubmit = (id) => {
    deleteStudent(
      {
        url: URLS.addStudent,
        attributes: {
          result_id: id,
          status_exam: false,
        },
      },
      {
        onSuccess: () => {
          toast.success("O'quvchi ro'yxatdan o'chirildi");
          window.location.reload();
        },
        onError: (error) => {
          console.error("Xatolik:", error);
          toast.error("Tahrirlashda xatolik yuz berdi!");
        },
      }
    );
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-lg w-2/3">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold">O&apos;quvchi o&apos;chirish</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          {isEmpty(get(resultDeleteStudent, "data", [])) ? (
            <h3 className="text-center text-lg font-semibold">
              Ro'yxat mavjud emas{" "}
            </h3>
          ) : (
            <table className="w-full mt-[30px] dark:text-white text-black">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2 rounded-tl-[10px]">
                    №
                  </th>
                  <th className="border border-gray-200 px-4 py-2">F.I.SH</th>

                  <th className="border border-gray-200 px-4 py-2">Viloyat</th>
                  {/* <th className="border border-gray-200 px-4 py-2">Tuman</th> */}
                  {/* <th className="border border-gray-200 px-4 py-2">
                  O&apos;quv dargohi
                </th>
                <th className="border border-gray-200 px-4 py-2">
                  O&apos;quv dargohi nomi
                </th>
                <th className="border border-gray-200 px-4 py-2">Kursi</th>
                <th className="border border-gray-200 px-4 py-2">
                  Ta&apos;lim tili
                </th> */}
                  <th className="border border-gray-200 px-4 py-2">
                    Tug&apos;ilgan sanasi
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Telefon raqam
                  </th>

                  <th className="border border-gray-200 px-4 py-2">
                    Jami ball
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Nechtasini topgan
                  </th>
                  <th className="border border-gray-200 px-4 py-2">Vaqt</th>
                  <th className="border border-gray-200 px-4 py-2">
                    O&apos;chirish
                  </th>
                </tr>
              </thead>
              <tbody>
                {get(resultDeleteStudent, "data", []).map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 text-center px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 text-center px-4 py-2">
                      {get(item, "full_name", "")}
                    </td>

                    <td className="border border-gray-200 text-center px-4 py-2">
                      {get(item, "region", "")}
                    </td>
                    <td className="border border-gray-200 text-center px-4 py-2">
                      {get(item, "brithday", "")}
                    </td>
                    <td className="border border-gray-200 text-center px-4 py-2">
                      +{get(item, "phone", "")}
                    </td>
                    <td className="border border-gray-200 text-center px-4 py-2">
                      {get(item, "score", "")}
                    </td>
                    <td className="border border-gray-200 text-center px-4 py-2">
                      {get(item, "correct_answers", "")} /{" "}
                      {get(item, "total_questions", "")}
                    </td>
                    <td className="border border-gray-200 text-center px-4 py-2">
                      {get(item, "test_time", "")}
                    </td>

                    <td className="border border-gray-200 text-center px-4 py-2 text-white ">
                      <button
                        onClick={() => onSubmit(get(item, "id"))}
                        className="bg-[#FA896B] py-[10px] px-[16px] rounded-[12px]"
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveStudentModal;
