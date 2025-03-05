import Link from "next/link";
import Image from "next/image";
const ErrorPage = () => {
  return (
    <>
      <div className="flex items-center flex-col text-center justify-center min-h-screen">
        <div className="flex items-center mb-[30px]">
          <Image src={"/images/500.png"} alt="500" width={362} height={362} />
        </div>
        <div>
          <h4 className="text-[36px] font-semibold mb-[30px]">Voy !!!</h4>
          <p className="text-[36px] font-semibold mb-[30px]">
            Serverning ichki xatoligi, iltimos keyinroq qayta urinib ko'ring!
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
