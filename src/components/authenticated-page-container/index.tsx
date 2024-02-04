import React, {PropsWithChildren} from "react";
import Piechart from "../icons/piechart";
import CursorArrowRipple from "../icons/cursor-arrow-ripple";
import Exit from "../icons/exit";
import ChevronDown from "../icons/chevron-down";
import {Link} from "react-router-dom";

const AuthenticatedPageContainer: React.FC<PropsWithChildren> = ({children}) => {
    const [expandedMenu, setExpandedMenu] = React.useState<string>('');

    const expandMenu = (menu: string) => {
        if (expandedMenu === menu) {
            setExpandedMenu('');
        } else {
            setExpandedMenu(menu);
        }
    }

    return (
        <>
            {/*Burger buton*/}
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar"
                    aria-controls="sidebar-multi-level-sidebar" type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            {/*Menu*/}
            <aside id="sidebar-multi-level-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/dashboard"
                                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Piechart/>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button"
                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
                                    onClick={() => expandMenu('admin')}
                            >
                                <CursorArrowRipple/>
                                <span
                                    className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Admin</span>
                                <ChevronDown/>
                            </button>
                            <ul id="dropdown-example"
                                className={`${expandedMenu && 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <Link
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        to="/users">Users</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/logout"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Exit/>
                                <span className="ms-3">Log out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64 bg-gray-100 min-h-svh">
                {children}
            </div>
        </>

    )
}

export default AuthenticatedPageContainer;