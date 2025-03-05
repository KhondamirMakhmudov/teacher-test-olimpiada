import { useState } from "react";

const EditSubjectModal = ({ isOpen, onClose, onEdit, quizData }) => {
  const [name, setName] = useState(quizData?.name || "");
  const [duration, setDuration] = useState(quizData?.duration_in_minutes || "");
  const [startDate, setStartDate] = useState(quizData?.start_date || "");
  const [endDate, setEndDate] = useState(quizData?.end_date || "");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    await onEdit(quizData.id, {
      name: name,
      duration_in_minutes: duration,
      start_date: startDate,

      end_date: endDate,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Quiz</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border mb-2"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
          className="w-full p-2 border mb-2"
        />
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubjectModal;
