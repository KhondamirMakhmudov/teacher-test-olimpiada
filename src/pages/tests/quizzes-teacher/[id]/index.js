import { KEYS } from "@/constants/key";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useSession } from "next-auth/react";
import { URLS } from "@/constants/url";
import { useRouter } from "next/router";
import Dashboard from "@/components/dashboard";
import ReactPaginate from "react-paginate";
import { get, set } from "lodash";
import { useState, useEffect } from "react";
import RightIcon from "@/components/icons/right";
import parse from "html-react-parser";
import Image from "next/image";
import TrashIcon from "@/components/icons/trash";
import EditIcon from "@/components/icons/edit";
import usePutQuery from "@/hooks/api/usePutQuery";
import { CKEditor } from "ckeditor4-react";
import usePostQuery from "@/hooks/api/usePostQuery";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import useDeleteQuery from "@/hooks/api/useDeleteQuery";

const options = ["A", "B", "C", "D"];
const scores = ["2.1", "3.1", "5.1"];

const Index = () => {
  const { theme } = useTheme();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);
  const [isOpenAnswerEdit, setIsOpenAnswerEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [content, setContent] = useState("");
  const { id } = router.query;
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedScore, setSelectedScore] = useState("");
  const [selectedEditOption, setSelectedEditOption] = useState("");
  const [selectedEditScore, setSelectedEditScore] = useState("");
  const [editData, setEditData] = useState({});
  const [formData, setFormData] = useState({
    question_uz: "",
    question_ru: "",
    A_uz: "",
    A_ru: "",
    B_uz: "",
    B_ru: "",
    C_uz: "",
    C_ru: "",
    D_uz: "",
    D_ru: "",
    science: "",
    answer: "",
    score: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    question_uz: "",
    question_ru: "",
    A_uz: "",
    A_ru: "",
    B_uz: "",
    B_ru: "",
    C_uz: "",
    C_ru: "",
    D_uz: "",
    D_ru: "",
    science: "",
    answer: "",
    score: "",
  });
  const {
    data: teacherQuiz,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.teacherQuiz,
    url: `${URLS.teacherQuiz}${id}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken && !!id,
  });

  const itemsPerPage = 10;
  const items = get(teacherQuiz, "data", []);

  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const { mutate: deleteQuiz, isLoadingDelete } = useDeleteQuery({
    listKeyId: "delete-quiz",
  });

  const handleDelete = (quizId) => {
    deleteQuiz(`https://test.iq-math.uz/api/v1/quiz/quiz/delete/${quizId}/`);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      science: id,
      answer: selectedOption,
      score: selectedScore,
    }));
  }, [id, selectedOption, selectedScore]); // Har safar ulardan biri o‘zgarsa, formData yangilanadi

  const handleEditorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditorChangeEdit = (field, data) => {
    setEditFormData((prev) => ({ ...prev, [field]: data }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // SelectBox event'larini to'g'ri bog'lash
  const handleAnswerChange = (event) => {
    setSelectedOption(event.target.value);
    handleSelectChange("answer", event.target.value);
  };

  const handleScoreChange = (event) => {
    setSelectedScore(event.target.value);
    handleSelectChange("score", event.target.value);
  };

  const { mutate: editQuizzes, isLoadingEditQuizzes } = usePutQuery({
    listKeyId: "editQuizzes",
    hideSuccessToast: true,
  });

  const handleEdit = (editQuizId) => {
    editQuizzes(
      {
        url: `https://test.iq-math.uz/api/v1/quiz/quiz/update/${editQuizId}/`,
        attributes: {}, // Bu yerga tahrir qilinadigan ma'lumotlarni qo'sh
      },
      {
        onSuccess: (data) => {
          // console.log("Response:", data);
          setEditFormData(get(data, "data", {}));
          setIsOpenEdit(true);
          // toast.success("Savol muvaffaqiyatli tahrirlandi!");
        },
        onError: (error) => {
          console.error("Xatolik:", error);
          toast.error("Tahrirlashda xatolik yuz berdi!");
        },
      }
    );
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://test.iq-math.uz/api/v1/quiz/quiz/add/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error("Xatolik yuz berdi, yozganingizni tekshiring");

        console.error("Validation Errors:", result.errors);
      } else {
        toast.success("Savol muvaqqiyatli jadvalga joylandi");
        console.log("Success:", result);
        setIsOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    setEditFormData((prev) => ({
      ...prev,
      science: id,
      answer: selectedEditOption,
      score: selectedEditScore,
    }));
  }, [id, selectedEditOption, selectedEditScore]);

  const handleUpdateSubmit = (quizId) => {
    editQuizzes(
      {
        url: `https://test.iq-math.uz/api/v1/quiz/quiz/update/${quizId}/`,
        attributes: editFormData, // 🔹 Foydalanuvchi kiritgan yangi ma'lumotlar
      },
      {
        onSuccess: (data) => {
          toast.success("Savol muvaffaqiyatli yangilandi!");
          setIsOpenEdit(false);
          window.location.reload();
        },
        onError: (error) => {
          console.error("Xatolik:", error);
          toast.error("Tahrirlashda xatolik yuz berdi!");
        },
      }
    );
  };

  console.log(editData.question_uz);

  return (
    <Dashboard>
      <div className="border p-[30px] mt-[30px] rounded-md">
        <button
          onClick={() => setIsOpen(true)}
          className={
            "bg-[#5D87FFFF] px-[20px] py-[10px] rounded-md text-white hover:bg-[#7ea0ff] active:scale-95 scale-100 transition-all duration-200"
          }
        >
          Savol qo&apos;shish
        </button>
        <table className="w-full mt-[30px]">
          <thead>
            <tr className="dark:text-white text-black">
              <th className="border border-gray-200 px-4 py-2 rounded-tl-[10px]">
                №
              </th>
              <th className="border border-gray-200  text-start px-4 py-2">
                Savol
              </th>
              <th className="border border-gray-200 px-4 py-2">Javob</th>
              <th className="border border-gray-200 px-4 py-2">Ball</th>
              <th className="border border-gray-200 px-4 py-2">
                O&apos;chirish/Tahrirlash
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-gray-100 dark:odd:bg-gray-600 dark:text-white text-black"
              >
                <td className="border border-gray-200 px-4 py-2 text-center text-sm ">
                  {offset + index + 1}
                </td>
                <td className="border border-gray-200 px-4 py-2 quizzes text-sm ">
                  {parse(get(item, "question_uz", ""))}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                  {parse(get(item, "answer", ""))}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                  {get(item, "score", "")}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center  text-sm">
                  <div
                    className={"flex items-center justify-center gap-x-[10px]"}
                  >
                    <button
                      onClick={() => setIsOpenDelete(true)}
                      className={
                        "flex items-center text-white bg-[#FA896BFF] hover:bg-[#ff7954] gap-x-[5px] px-[10px] py-2 rounded-md"
                      }
                    >
                      <TrashIcon />
                      <p>O&apos;chirish</p>
                    </button>

                    <button
                      onClick={() => handleEdit(get(item, "id", ""))}
                      className={
                        "flex items-center text-white bg-[#5D87FFFF] gap-x-[5px] px-[10px] py-2 rounded-md"
                      }
                    >
                      <EditIcon color="white" />
                      <p>Tahrirlash</p>
                    </button>
                    {/* <Image
                      src={"/icons/trash.svg"}
                      alt="trash"
                      width={24}
                      height={24}
                    /> */}

                    {isOpenDelete && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                          <h2 className="text-lg font-semibold mb-4">
                            O&apos;chirishga aminmisiz?
                          </h2>
                          <div className="flex justify-between gap-4">
                            <button
                              onClick={() => setIsOpenDelete(false)}
                              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                              Bekor qilish
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(get(item, "id"));
                                setIsOpenDelete(false);
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Ha, o&apos;chirish
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={"flex justify-between mt-[10px]"}>
          <div>
            <p className="text-sm text-gray-400">
              {items?.length} ta testdan {currentItems.length} tasi
              ko&apos;rsatilmoqda
            </p>
          </div>
          <ReactPaginate
            previousLabel={
              <RightIcon
                color={theme === "light" ? "black" : "gray"}
                classname={"rotate-180"}
              />
            }
            nextLabel={
              <RightIcon color={theme === "light" ? "black" : "gray"} />
            }
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex  space-x-2"
            pageClassName="border px-4 py-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#455874] transition-all duration-200"
            activeClassName="bg-blue-500 text-white"
            previousClassName="border px-3 py-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#455874] transition-all duration-200"
            nextClassName="border px-3 py-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#455874] transition-all duration-200"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>

      {isOpen && (
        <div className="fixed overflow-y-scroll inset-0 flex items-start  justify-end bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ x: "100%" }} // Start off-screen (right)
            animate={{ x: 0 }} // Slide in to position
            exit={{ x: "100%" }} // Slide out when closed
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white dark:bg-[#26334AFF] overflow-hidden p-6 rounded-tl-xl rounded-bl-xl min-h-screen shadow-lg w-2/3"
          >
            <button onClick={() => setIsOpen(false)}>
              <Image
                src={"/images/close.png"}
                alt={"close"}
                width={24}
                height={24}
              />
            </button>
            {/* question */}
            <div className="grid grid-cols-2 gap-[20px] mt-[30px]">
              <div className="col-span-1">
                <p className="mb-[10px]">
                  Savolni kiriting (O&apos;zbek tilida)
                </p>
                <CKEditor
                  initData={formData.question_uz}
                  onChange={(event) =>
                    handleEditorChange("question_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Savolni kiriting (Rus tilida)</p>
                <CKEditor
                  initData={formData.question_ru}
                  onChange={(event) =>
                    handleEditorChange("question_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="h-[1px] w-full col-span-2 bg-gray-200 my-[20px]"></div>
            </div>

            {/* answers */}
            <div className="grid grid-cols-2 gap-[20px] mb-[30px]">
              <div className="col-span-1">
                <p className="mb-[10px]">Javob A (O&apos;zbek tilida)</p>
                <CKEditor
                  initData={formData.A_uz}
                  onChange={(event) =>
                    handleEditorChange("A_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob A (Rus tilida)</p>
                <CKEditor
                  initData={formData.A_ru}
                  onChange={(event) =>
                    handleEditorChange("A_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="h-[1px] w-full col-span-2 bg-gray-200 my-[20px]"></div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob B (O&apos;zbek tilida)</p>
                <CKEditor
                  initData={formData.B_uz}
                  onChange={(event) =>
                    handleEditorChange("B_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob B (Rus tilida)</p>
                <CKEditor
                  initData={formData.B_ru}
                  onChange={(event) =>
                    handleEditorChange("B_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="h-[1px] w-full col-span-2 bg-gray-200 my-[20px]"></div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob C (O&apos;zbek tilida)</p>
                <CKEditor
                  initData={formData.C_uz}
                  onChange={(event) =>
                    handleEditorChange("C_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob C (Rus tilida)</p>
                <CKEditor
                  initData={formData.C_ru}
                  onChange={(event) =>
                    handleEditorChange("C_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="h-[1px] w-full col-span-2 bg-gray-200 my-[20px]"></div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob D (O&apos;zbek tilida)</p>
                <CKEditor
                  initData={formData.D_uz}
                  onChange={(event) =>
                    handleEditorChange("D_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob D (Rus tilida)</p>
                <CKEditor
                  initData={formData.D_ru}
                  onChange={(event) =>
                    handleEditorChange("D_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[20px] mb-[30px]">
              <div className="relative col-span-1">
                <div
                  className="flex justify-between items-center px-4 py-2 border rounded-lg cursor-pointer bg-gray-100"
                  onClick={() => setIsOpenAnswer(!isOpenAnswer)}
                >
                  <span>{selectedOption || "To‘g‘ri javobni tanlang"}</span>
                  {isOpen ? (
                    <RightIcon classname={"-rotate-90"} />
                  ) : (
                    <RightIcon classname={"rotate-90"} />
                  )}
                </div>
                {isOpenAnswer && (
                  <div className="absolute left-0 -top-[180px] right-0 mt-1 bg-white border rounded-lg shadow-md">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                        onClick={() => {
                          setSelectedOption(option);
                          setIsOpenAnswer(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-span-1">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedScore}
                  onChange={(e) => setSelectedScore(e.target.value)}
                  placeholder="Ball kiriting"
                />
                {selectedScore && (
                  <p className="mt-2 text-green-600 font-medium">
                    Siz tanlagan ball: {selectedScore}
                  </p>
                )}
              </div>
            </div>

            <div className="my-[30px]">
              <button
                onClick={handleSubmit}
                className="bg-[#13DEB9] text-white px-[20px] py-[10px] rounded-md float-right"
              >
                Yakunlash
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {isOpenEdit && (
        <div className="fixed overflow-y-scroll inset-0 flex items-start  justify-end bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ x: "100%" }} // Start off-screen (right)
            animate={{ x: 0 }} // Slide in to position
            exit={{ x: "100%" }} // Slide out when closed
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white dark:bg-[#26334AFF] overflow-hidden p-6 rounded-tl-xl rounded-bl-xl min-h-screen shadow-lg w-2/3"
          >
            <button onClick={() => setIsOpenEdit(false)}>
              <Image
                src={"/images/close.png"}
                alt={"close"}
                width={24}
                height={24}
              />
            </button>
            {/* question */}
            <div className="grid grid-cols-2 gap-[20px] mt-[30px]">
              <div className="col-span-1">
                <p className="mb-[10px]">
                  Savolni kiriting (O&apos;zbek tilida)
                </p>
                <CKEditor
                  initData={editFormData?.question_uz}
                  onChange={(event) =>
                    handleEditorChangeEdit(
                      "question_uz",
                      event.editor.getData()
                    )
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Savolni kiriting (Rus tilida)</p>
                <CKEditor
                  initData={editFormData?.question_ru}
                  onChange={(event) =>
                    handleEditorChangeEdit(
                      "question_ru",
                      event.editor.getData()
                    )
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="h-[1px] w-full col-span-2 bg-gray-200 my-[20px]"></div>
            </div>

            {/* answers */}
            <div className="grid grid-cols-2 gap-[20px] mb-[30px]">
              <div className="col-span-1">
                <p className="mb-[10px]">Javob A (O&apos;zbek tilida)</p>
                <CKEditor
                  initData={editFormData?.A_uz}
                  onChange={(event) =>
                    handleEditorChangeEdit("A_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob A (Rus tilida)</p>
                <CKEditor
                  initData={editFormData?.A_ru}
                  onChange={(event) =>
                    handleEditorChangeEdit("A_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="h-[1px] w-full col-span-2 bg-gray-200 my-[20px]"></div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob B (O&apos;zbek tilida)</p>
                <CKEditor
                  initData={editFormData?.B_uz}
                  onChange={(event) =>
                    handleEditorChangeEdit("B_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob B (Rus tilida)</p>
                <CKEditor
                  initData={editFormData?.B_ru}
                  onChange={(event) =>
                    handleEditorChangeEdit("B_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="h-[1px] w-full col-span-2 bg-gray-200 my-[20px]"></div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob C (O&apos;zbek tilida)</p>
                <CKEditor
                  initData={editFormData?.C_uz}
                  onChange={(event) =>
                    handleEditorChangeEdit("C_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob C (Rus tilida)</p>
                <CKEditor
                  initData={editFormData?.C_ru}
                  onChange={(event) =>
                    handleEditorChangeEdit("C_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="h-[1px] w-full col-span-2 bg-gray-200 my-[20px]"></div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob D (O&apos;zbek tilida)</p>
                <CKEditor
                  initData={editFormData?.D_uz}
                  onChange={(event) =>
                    handleEditorChangeEdit("D_uz", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>

              <div className="col-span-1">
                <p className="mb-[10px]">Javob D (Rus tilida)</p>
                <CKEditor
                  initData={editFormData?.D_ru}
                  onChange={(event) =>
                    handleEditorChangeEdit("D_ru", event.editor.getData())
                  }
                  config={{
                    toolbar: [
                      ["Bold", "Italic", "Strike"], // Text styling
                      [
                        "BulletedList",
                        "NumberedList",
                        "Outdent",
                        "Indent",
                        "Blockquote",
                      ], // Lists and indentation
                      ["Image", "Table", "SpecialChar"], // Media and special characters
                      ["Link", "Unlink"], // Links
                      ["Maximize", "Source"], // Fullscreen & Source mode
                      ["Undo", "Redo"], // Undo/Redo
                    ],
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[20px] mb-[30px]">
              <div className="relative col-span-1">
                <div
                  className="flex justify-between items-center px-4 py-2 border rounded-lg cursor-pointer bg-gray-100"
                  onClick={() => setIsOpenAnswerEdit(!isOpenAnswerEdit)}
                >
                  <span>{selectedEditOption || "To‘g‘ri javobni tanlang"}</span>
                  {isOpenAnswerEdit ? (
                    <RightIcon classname={"-rotate-90"} />
                  ) : (
                    <RightIcon classname={"rotate-90"} />
                  )}
                </div>
                {isOpenAnswerEdit && (
                  <div className="absolute left-0 -top-[180px] right-0 mt-1 bg-white border rounded-lg shadow-md">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                        onClick={() => {
                          setSelectedEditOption(option);
                          setIsOpenAnswerEdit(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-span-1">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedEditScore}
                  onChange={(e) => setSelectedEditScore(e.target.value)}
                  placeholder="Ball kiriting"
                />
                {selectedEditScore && (
                  <p className="mt-2 text-green-600 font-medium">
                    Siz tanlagan ball: {selectedEditScore}
                  </p>
                )}
              </div>
            </div>

            <div className="my-[30px]">
              <button
                onClick={() => handleUpdateSubmit(editFormData?.id)}
                className="bg-[#13DEB9] text-white px-[20px] py-[10px] rounded-md float-right"
              >
                Yakunlash
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </Dashboard>
  );
};

export default Index;
