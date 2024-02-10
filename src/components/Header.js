import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useUserContext } from "./UserContext";
import { Link } from "react-router-dom";
import Dark from "../theme/Dark";
import "../App.css";
import { FaBullseye } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useUserContext();
  // console.log(user);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("isLoggedIn");
    if (storedUser) {
      // setUser(JSON.parse(storedUser));
      setUser(true);
    } else {
      setUser(null);
    }
  }, [setUser]);

  useEffect(() => {
    setLogged(user !== null);
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("uid");
    localStorage.removeItem("user");
  };

  return (
    <div className="navv">
      <header className="  top-0 w-full ">
        <nav
          className="mx-auto flex max-w-[1400px] items-center justify-between px-2 py-5 lg:px-3"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 space-x-5 items-center">
            <a href="/">
              <img
                src="/logo.png"
                alt="logo"
                className="w-56 mr-4 cursor-pointer"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  width="19"
                  height="11"
                  viewBox="0 0 19 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" width="15" height="3" rx="1.5" fill="#D9D9D9" />
                  <rect y="4" width="19" height="3" rx="1.5" fill="#D9D9D9" />
                  <rect
                    x="2"
                    y="8"
                    width="15"
                    height="3"
                    rx="1.5"
                    fill="#D9D9D9"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-5">
            <a>
              <Dark className="mt-[14px] fixed flex`" />
            </a>

            <Link
              to={"/submit/tool"}
              className="text-[18px] flex items-center font-semibold font-mont leading-6 text-white cursor-pointer hover:text-[#FF9900]"
            >
              Submit
            </Link>

            {user ? (
              <Link className="text-[18px] flex items-center font-semibold font-mont leading-6 text-white cursor-pointer hover:text-[#FF9900] group relative">
                Dashboard
                <div className="dropdown-menu absolute z-10 text-center hidden group-hover:block bottom-[-130px] left-[-10px]">
                  <ul className="flex flex-col px-[11px] rounded-lg bg-white">
                    <Link to="/submit">
                      <li className="font-mont cursor-pointer pt-2 text-black hover:bg-gray-100 w-full px-4 py-1 rounded-lg">
                        Profile
                      </li>
                    </Link>
                    {/* <Link to="/">
                      <li className="font-mont cursor-pointer text-black hover:bg-gray-100 w-full px-4 py-1 rounded-lg">
                        Learn
                      </li>
                    </Link> */}
                    <Link to="/blog">
                      <li className="font-mont cursor-pointer text-black hover:bg-gray-100 w-full px-4 py-1 rounded-lg">
                        Blog
                      </li>
                    </Link>
                    <Link to="/submit/tool">
                      <li className="font-mont cursor-pointer text-black hover:bg-gray-100 w-full px-4 py-1 rounded-lg">
                        Submit
                      </li>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex justify-center items-center"
                    >
                      <li className="font-mont cursor-pointer pb-2 text-black hover:bg-gray-100 w-full px-4 py-1 rounded-lg flex justify-center items-center">
                        <MdLogout />
                      </li>
                    </button>
                  </ul>
                </div>
              </Link>
            ) : (
              <Link
                to={"/submit"}
                className="text-[18px] flex items-center font-semibold font-mont leading-6 text-white cursor-pointer hover:text-[#FF9900]"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto text-white bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="/logo.png" alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div
                  className="pt-6 flex justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link
                    to={"/submit/tool"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-[16px] font-mont font-semibold leading-7 text-white hover:text-[#FF9900]"
                  >
                    Submit
                  </Link>
                </div>

                <div
                  className="flex justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {/* <Dark /> */}
                </div>

                <div
                  className="flex justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link
                    to={"/submit"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-[16px] font-mont font-semibold leading-7 text-white hover:text-[#FF9900]"
                  >
                    {user ? "Dashboard" : "Login"}
                  </Link>
                </div>
                <div
                  className="flex justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link
                    to={"/blog"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-[16px] font-mont font-semibold leading-7 text-white hover:text-[#FF9900]"
                  >
                    {user ? "Blog" : ""}
                  </Link>
                </div>
                <div
                  className="flex justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link
                    to={"/submit"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-[16px] font-mont font-semibold leading-7 text-white hover:text-[#FF9900]"
                  >
                    {user ? (
                      <button onClick={handleLogout}>
                        <MdLogout />
                      </button>
                    ) : (
                      ""
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
