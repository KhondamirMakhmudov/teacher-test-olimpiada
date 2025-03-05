import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import * as XLSX from "xlsx";
import { get } from "lodash";
import { useState } from "react";
import Image from "next/image";
import UserStudentIcon from "@/components/icons/user-student";
import RightIcon from "@/components/icons/right";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

const PassedTestStudent = () => {
  const { data: session } = useSession();
  const pageSizeOptions = [10, 50, 100, 200, 300, 400, 500];
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: passedTestAll } = useGetQuery({
    key: KEYS.passedTestAll,
    url: URLS.passedTestAll,
  });

  const items = get(passedTestAll, "data", []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      items.map((item, index) => ({
        "№": index + 1,
        "F.I.SH": get(item, "full_name", ""),
        Viloyat: get(item, "region", ""),
        "Tug'ilgan sanasi": get(item, "brithday", ""),
        "Telefon raqam": `+${get(item, "phone", "")}`,
        "Jami ball": get(item, "score", ""),
        "Nechtasini topgan": `${get(item, "correct_answers", "")} / ${get(
          item,
          "total_questions",
          ""
        )}`,
        Vaqt: get(item, "test_time", ""),
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
    XLSX.writeFile(workbook, "IQMATH.xlsx");
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

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery)
    )
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...currentItems].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const valueA = get(a, sortConfig.key, "").toString().toLowerCase();
    const valueB = get(b, sortConfig.key, "").toString().toLowerCase();

    if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
  return (
    <div className="border p-[30px]">
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
              {get(passedTestAll, "data", [])?.length}
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
      <table className="w-full mt-[30px] dark:text-white text-black">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 rounded-tl-[10px]">
              №
            </th>
            <th className="border border-gray-200 px-4 py-2">F.I.SH</th>

            <th className="border border-gray-200 px-4 py-2">Viloyat</th>
            <th className="border border-gray-200 px-4 py-2">Tuman</th>
            <th className="border border-gray-200 px-4 py-2">
              O&apos;quv dargohi
            </th>
            <th className="border border-gray-200 px-4 py-2">
              O&apos;quv dargohi nomi
            </th>
            <th className="border border-gray-200 px-4 py-2">Kursi</th>
            <th className="border border-gray-200 px-4 py-2">
              Ta&apos;lim tili
            </th>
            <th className="border border-gray-200 px-4 py-2">
              Tug&apos;ilgan sanasi
            </th>
            <th className="border border-gray-200 px-4 py-2">Telefon raqam</th>

            <th className="border border-gray-200 px-4 py-2">Jami ball</th>
            <th className="border border-gray-200 px-4 py-2">
              Nechtasini topgan
            </th>
            <th className="border border-gray-200 px-4 py-2">Vaqt</th>
          </tr>
        </thead>
        <tbody>
          {get(passedTestAll, "data", []).map((item, index) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassedTestStudent;
