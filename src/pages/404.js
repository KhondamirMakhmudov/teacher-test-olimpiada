import Link from "next/link";
import React from "react";
import Image from "next/image";
const Index = () => {
  return (
    <>
      <div className="flex items-center flex-col text-center justify-center min-h-screen">
        <div className="flex items-center mb-[30px]">
          <Image src={"/images/404.png"} alt="404" width={362} height={362} />
        </div>
        <div>
          <h4 className="text-[36px] font-semibold mb-[30px]">Voy !!!</h4>
          <p className="text-[36px] mb-[30px]">
            Siz izlayotgan bu sahifa topilmadi.
          </p>

          <Link
            href={"/"}
            className="border bg-[#5D87FF] text-white px-[35px] py-[10px] rounded-md text-xl"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
