const AddStudentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-2/3">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold">O&apos;quvchi qo&apos;shish</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">№</th>
                <th className="border p-2">F.I.SH</th>
                <th className="border p-2">Viloyat</th>
                <th className="border p-2">Tug&apos;ilgan kuni</th>
                <th className="border p-2">Telefon raqam</th>
                <th className="border border-gray-200 px-4 py-2">Jami ball</th>
                <th className="border border-gray-200 px-4 py-2">
                  Nechtasini topgan
                </th>
                <th className="border border-gray-200 px-4 py-2">Vaqt</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
