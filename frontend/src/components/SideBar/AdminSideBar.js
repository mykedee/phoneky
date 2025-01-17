import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { LiaUsersSolid } from "react-icons/lia";
import { GrClose, GrOrderedList } from "react-icons/gr";
import { BiUser } from "react-icons/bi";
import { MdOutlineWorkOutline, MdOutlineCategory } from "react-icons/md";
import { GiBigGear } from "react-icons/gi";
import { LiaBoxSolid } from "react-icons/lia";
import { MdOutlinePaid } from "react-icons/md";
import { PiShootingStarThin } from "react-icons/pi";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";

const DashLeftBar = (props) => {
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {}
  };

  return (
    <section className="relative">
      <div className={props.cardOpen ? "cardClose" : "cardOpen"}>
        <div className="bg-white dark:bg-slate-700 dark:shadow-xl overflow-y-scroll overflow-x-hidden shadow fixed md:w-[28vw] lg:w-[18vw] w-5/6 min-h-full z-40 ">
          <div className="flex justify-between items-center space-x-7 p-5">
            <div className="justify-start mx-3">
              <Link
                to="/"
                className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent"
              >
                  <h1 className="text-3xl font-bold">Phoneky</h1>
              </Link>
            </div>
            <div
              className="mx-5 text-white justify-end"
              onClick={props.handleClick}
            >
              <h1 className="lg:hidden dark:fill-zinc-50" id={"dark-white"}>
                <GrClose className="dark:fill-zinc-50" />
              </h1>
            </div>
            <div
              className="absolute top-20 h-full lg:h-0  w-full right-0 z-50 bg-primary"
              onClick={props.handleClick}
            >
              <NavLink
                to="/dashboard"
                activeClassName="active"
                className="link"
                end
              >
                <span className=" mx-3">
                  <MdOutlineDashboard />
                </span>
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/dashboard/users"
                activeClassName="active"
                className="link"
              >
                <span className=" mx-3">
                  <LiaUsersSolid />
                </span>
                <span>Customers</span>
              </NavLink>

              <NavLink
                to="/dashboard/products"
                activeClassName="active"
                className="link"
              >
                <span className="mx-3">
                  <LiaBoxSolid />
                </span>

                <span>Products</span>
              </NavLink>

              <NavLink
                to="/dashboard/featured"
                activeClassName="active"
                className="link"
              >
                <span className="mx-3">
                  <PiShootingStarThin />
                </span>

                <span>Featured Products</span>
              </NavLink>

              <NavLink
                to="/dashboard/orders"
                activeClassName="active"
                className="link"
              >
                <span className=" mx-3">
                  <MdOutlinePaid />
                </span>
                <span>Orders</span>
              </NavLink>

              <NavLink
                to="/dashboard/categories"
                activeClassName="active"
                className="link"
              >
                <span className="mx-3">
                  <MdOutlineCategory />{" "}
                </span>

                <span>Categories</span>
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                activeClassName="active"
                className="link"
              >
                <span className="mx-3">
                  <BiUser />
                </span>

                <span>Profile</span>
              </NavLink>

              <NavLink
                to="/dashboard/edit-account"
                activeClassName="active"
                className="link"
              >
                <span className="mx-3">
                  <GiBigGear />
                </span>

                <span>Account Security</span>
              </NavLink>

              <NavLink
                to="/dashboard/bloglist"
                activeClassName="active"
                className="link"
              >
                <span className="mx-3">
                  <GrOrderedList />
                </span>

                <span className="">Blog</span>
              </NavLink>
              <h6 className="text-xs mx-7 border-b p-1">PAGES</h6>

              <NavLink
                to="/dashboard/jobs"
                activeClassName="active"
                className="link"
              >
                <span className="mx-3">
                  <MdOutlineWorkOutline />
                </span>

                <span>Jobs</span>
              </NavLink>

              <NavLink
                to="/dashboard/jobs"
                activeClassName="active"
                className="link"
              >
                <span className="mx-3">
                  <MdOutlineWorkOutline />
                </span>

                <span>Careers</span>
              </NavLink>
              <h6 className="text-xs mx-7 border-b p-1">CHARTS</h6>

              <Link
                to="#"
                className="absolute w-[200px] hover:w-[200px] lg:w-[250px] flex items-center mx-3 p-4 my-3 hover:bg-danger-primary-hover hover:text-white md:hover:w-[200px] lg:hover:w-[225px] hover:rounded cursor-pointer"
                onClick={logoutHandler}
              >
                <span className="mx-3">
                  <FiLogOut />
                </span>
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashLeftBar;
