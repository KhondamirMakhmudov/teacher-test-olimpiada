import { useState } from "react";
import ReactPaginate from "react-paginate";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Image from "next/image";
import RightIcon from "@/components/icons/right";
import * as XLSX from "xlsx";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import UserStudentIcon from "@/components/icons/user-student";
import ContentLoader from "@/components/loader/content-loader";
const TableWithPagination = () => {
  const { data: session } = useSession();
  const pageSizeOptions = [10, 50, 100, 200, 300, 400, 500];
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    data: passedTestAll,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.passedTestAll,
    url: URLS.passedTestAll,
    params: {
      limit: itemsPerPage,
      offset: currentPage * itemsPerPage,
    },
  });

  const items = get(passedTestAll, "data.results", []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      items.map((item, index) => ({
        "№": index + 1,
        "F.I.SH": get(item, "full_name", ""),
        "To'g'ri javoblar": `${get(item, "correct_answers", "")}`,
        "Umumiy savollar": `${get(item, "total_questions", "")}`,
        "Jami ball": `${get(item, "score", "")}`,
        Vaqt: `${get(item, "test_time", "")}`,
        Viloyat: get(item, "region", ""),
        Tuman: get(item, "districts", ""),
        Manzil: get(item, "address", ""),
        "Tug'ilgan sanasi": get(item, "brithday", ""),
        "O'quv dargohi": get(item, "academy_or_school", ""),
        "O'quv dargohi nomi": get(item, "academy_or_school_name", ""),
        Kursi: get(item, "class_name", ""),
        "Hujjat turi": get(item, "document_type", ""),
        "Hujjat sseriya raqami": get(item, "document", ""),
        "Ta'lim tili": get(item, "type_of_education", ""),
        "Telefon raqam": `+${get(item, "phone", "")}`,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ma'lumotlar");

    // Jadval sarlavhalarini qalin qilish (bold)
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[cellRef]) continue;
      worksheet[cellRef].s = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    // Ustun kengliklarini avtomatik qilish
    worksheet["!cols"] = Object.keys(worksheet).map(() => ({ wch: 20 }));

    // Excel faylini yuklash
    XLSX.writeFile(workbook, "IQMATH-passed-students.xlsx");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(0);
  };

  const handleItemsPerPageChange = (newSize) => {
    setItemsPerPage(newSize);
    setCurrentPage(0);
    setIsDropdownOpen(false);
  };

  // const filteredItems = items.filter((item) =>
  //   Object.values(item).some((value) =>
  //     String(value).toLowerCase().includes(searchQuery)
  //   )
  // );

  // const offset = currentPage * itemsPerPage;
  // const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
  // const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  // const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // const handleSort = (key) => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });
  // };

  // const sortedItems = [...filteredItems].sort((a, b) => {
  //   if (!sortConfig.key) return 0;

  //   const valueA = get(a, sortConfig.key, "").toString().toLowerCase();
  //   const valueB = get(b, sortConfig.key, "").toString().toLowerCase();

  //   if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
  //   if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
  //   return 0;
  // });
  // const offset = currentPage * itemsPerPage;
  // const paginatedItems = sortedItems.slice(offset, offset + itemsPerPage);

  // // 4️⃣ Sahifalar sonini hisoblash
  // const pageCount = Math.ceil(sortedItems.length / itemsPerPage);
  return (
    <div className="border overflow-hidden rounded-md  p-[30px] w-full">
      <div className="flex justify-between items-center">
        <button
          onClick={downloadExcel}
          className="flex gap-x-[10px] bg-[#00733B] hover:bg-[#00733bf1] scale-100 active:scale-90 py-[9px] px-[20px] items-center rounded-[8px] transform-all duration-200"
        >
          <Image src={"/icons/excel.svg"} alt="excel" width={24} height={24} />
          <p className="text-sm font-gilroy text-white ">Excel yuklash</p>
        </button>

        <div className="flex gap-x-[20px] items-center">
          <div className="flex gap-x-[5px]">
            <UserStudentIcon color="#7C8FAC" />
            <p className="text-[#7C8FAC]">
              {get(passedTestAll, "data.count", "")}
            </p>
          </div>
          <div className="relative">
            <div
              className="w-auto px-4 py-2 border rounded cursor-pointer flex justify-between gap-x-[10px] items-center dark:text-white bg-white dark:bg-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <p>{itemsPerPage}</p>
              <RightIcon
                classname={`${
                  !isDropdownOpen ? "rotate-90" : "-rotate-90"
                } transition-all duration-200`}
                color="#BCBDBE"
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute w-auto mt-2 bg-white dark:bg-gray-700 dark:text-white border rounded shadow-lg z-10">
                {pageSizeOptions.map((size) => (
                  <div
                    key={size}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
                      itemsPerPage === size ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handleItemsPerPageChange(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Qidiruv..."
            className="w-full p-2  border rounded bg-transparent dark:text-white text-black"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="mt-[30px]">
          <ContentLoader />
        </div>
      ) : (
        <div className="w-full overflow-x-auto mt-8">
          <div className="min-w-[1200px] max-w-full max-h-[500px] overflow-auto border border-gray-200 rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="dark:text-white text-black">
                  {[
                    { key: "index", label: "№" },
                    { key: "full_name", label: "F.I.SH" },
                    { key: "correct_answers", label: "Nechtasini topgan" },
                    { key: "score", label: "Umumiy ball" },
                    { key: "test_time", label: "Vaqt" },
                    { key: "document_type", label: "Hujjat turi" },
                    { key: "document", label: "Hujjat seriya raqami" },
                    { key: "region", label: "Viloyat" },
                    { key: "districts", label: "Tuman" },
                    { key: "address", label: "Manzil" },
                    { key: "academy_or_school", label: "O‘quv dargohi" },
                    {
                      key: "academy_or_school_name",
                      label: "O‘quv dargohi nomi",
                    },
                    { key: "class_name", label: "Kursi" },
                    { key: "type_of_education", label: "Ta’lim tili" },
                    { key: "brithday", label: "Tug‘ilgan sanasi" },
                    { key: "phone", label: "Telefon raqam" },
                  ].map((column) => (
                    <th
                      key={column.key}
                      onClick={() => handleSort(column.key)}
                      className="border border-gray-200 px-4 py-2 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <p>{column.label}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {get(passedTestAll, "data.results", []).map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-100 dark:odd:bg-[#455874] dark:text-white text-black"
                  >
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "full_name", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "correct_answers", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "score", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "test_time", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "document_type", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "document", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "region", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "districts", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "address", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "academy_or_school", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "academy_or_school_name", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "class_name", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "type_of_education", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      {get(item, "brithday", "")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center text-sm">
                      +{get(item, "phone", "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <ReactPaginate
        previousLabel={
          <RightIcon
            color={theme === "light" ? "black" : "white"}
            classname={"rotate-180"}
          />
        }
        nextLabel={<RightIcon color={theme === "light" ? "black" : "white"} />}
        breakLabel={"..."}
        pageCount={Math.ceil(
          get(passedTestAll, "data.results", "") / itemsPerPage
        )}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex justify-end mt-4 dark:text-white text-black space-x-2"
        pageClassName="border px-3 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#455874]"
        activeClassName="bg-blue-500 text-white"
        previousClassName="border px-3 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#455874]"
        nextClassName="border px-3 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#455874]"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default TableWithPagination;
