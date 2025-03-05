import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Brand = () => {
  const router = useRouter();
  return (
    <div className={"  "}>
      <Link href={"/"}>
        <h1
          className={`font-semibold text-[34px] uppercase  font-myriad dark:text-white ${
            router.pathname === "/"
              ? "!text-black"
              : "text-black dark:text-white"
          }  text-center `}
        >
          Admin
        </h1>
      </Link>
    </div>
  );
};

export default Brand;
