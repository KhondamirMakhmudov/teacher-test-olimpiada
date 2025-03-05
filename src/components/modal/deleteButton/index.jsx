import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const DeleteButton = ({ item, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-white bg-[#FA896BFF] hover:bg-[#ff7954] gap-x-[5px] px-[10px] py-2 rounded-md"
      >
        <TrashIcon className="w-5 h-5" />
        <p>O&apos;chirish</p>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              O&apos;chirishga aminmisiz?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  handleDelete(item.id);
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Ha, o&apos;chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
