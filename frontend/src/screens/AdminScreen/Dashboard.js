import { TbMoneybag } from "react-icons/tb";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import CardContainer from "../../components/Global/CardContainer";

const Dashboard = () => {
  return (
    <>
      <CardContainer>
        <div className="flex justify-between gap-4 text-center items-center overflow-x-scroll lg:overflow-x-hidden">
          <div className="h-52 px-12 lg:px-0 lg:h-auto py-10 my-2 rounded bg-white transition ease-in-out hover:bg-[#fdfdfd] dark:bg-slate-700 w-full ">
            <div className="flex flex-1 justify-center items-center space-y-2">
              <div className="flex justify-center items-center  rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
                <TbMoneybag size={20} />
              </div>
            </div>

            <div className="my-1">
              <p>Total Sales</p>
            </div>
          </div>

          <div className="h-52 px-12 lg:px-0 lg:h-auto py-10 rounded bg-white transition ease-in-out hover:bg-[#fdfdfd] dark:bg-slate-700  w-full">
            <div className="flex flex-1 justify-center items-center space-y-2">
              <div className="flex justify-center items-center rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
                <MdOutlineStackedLineChart size={20} />
              </div>
            </div>
            <div className="my-1 w-full">
              <p>Order Completed</p>
            </div>
          </div>

          <div className="h-52 px-12 lg:px-0 lg:h-auto py-10 rounded bg-white transition ease-in-out hover:bg-[#fdfdfd] dark:bg-slate-700  w-full">
            <div className="flex flex-1 justify-center items-center space-y-2">
              <div className="flex justify-center items-center  rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
                <HiOutlineUsers size={20} />
              </div>
            </div>
            <div className="my-1">
              <p>Customers</p>
            </div>
          </div>
        </div>
      </CardContainer>
    </>
  );
};

export default Dashboard;
