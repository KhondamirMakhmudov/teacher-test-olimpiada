import Dashboard from "@/components/dashboard";
import { useState } from "react";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import RegistratedStudents from "@/components/students-folder/registrated-students";
import SuccessFullyPassedTest from "@/components/students-folder/successfully-passed-test";
import PassedTestStudent from "@/components/students-folder/passed-test-student";

const Index = () => {
  const [tab, setTab] = useState("passed-students");

  const handleTab = (tab) => {
    setTab(tab);
  };

  const { data: passedTest } = useGetQuery({
    key: KEYS.passedTest,
    url: URLS.passedTest,
  });

  const { data: passedTestAll } = useGetQuery({
    key: KEYS.passedTestAll,
    url: URLS.passedTestAll,
  });

  return (
    <Dashboard>
      <ul className="grid grid-cols-12 gap-x-[5px] my-[30px]">
        <li className="col-span-2 text-center">
          <button
            onClick={() => handleTab("passed-students")}
            className={` ${
              tab === "passed-students"
                ? "bg-[#5D87FF] text-white"
                : "bg-transparent text-[#5D87FF]"
            } w-full py-2 rounded-lg transition-all duration-300`}
          >
            Imtihon topshirgan o&apos;quvchilar
          </button>
        </li>
        <li className="col-span-2 text-center">
          <button
            onClick={() => handleTab("successfully-passed-test")}
            className={` ${
              tab === "successfully-passed-test"
                ? "bg-[#5D87FF] text-white"
                : "bg-transparent text-[#5D87FF]"
            } w-full py-2 rounded-lg transition-all duration-300`}
          >
            Imtihondan o&apos;tgan o&apos;quvchilar
          </button>
        </li>
        <li className="col-span-2 text-center">
          <button
            onClick={() => handleTab("passed-register")}
            className={` ${
              tab === "passed-register"
                ? "bg-[#5D87FF] text-white"
                : "bg-transparent text-[#5D87FF]"
            } w-full py-2 rounded-lg transition-all duration-300`}
          >
            Ro&apos;yxatdan o&apos;tgan o&apos;quvchilar
          </button>
        </li>
      </ul>

      {tab === "passed-students" && <PassedTestStudent />}

      {tab === "successfully-passed-test" && <SuccessFullyPassedTest />}

      {tab === "passed-register" && <RegistratedStudents />}
    </Dashboard>
  );
};

export default Index;
