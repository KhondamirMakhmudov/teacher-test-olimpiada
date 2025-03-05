import { useForm } from "react-hook-form";

const SmsModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      message: `IQ-MATH. 2-Bosqichga o‘tganingiz bilan tabriklaymiz! batafsil:  https://www.iq-math.uz/about-olympics\nPozdravlyaem s perexodom na 2-y etap! podrobnee:  https://www.iq-math.uz/about-olympics`,
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <h2 className="text-lg font-bold mb-4">SMS Yuborish</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("message")}
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Yuborish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmsModal;
