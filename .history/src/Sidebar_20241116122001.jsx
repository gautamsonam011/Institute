import React, { useState } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillCCircleFill,
  BsPeopleFill,
  BsFillGearFill,
  BsChevronDown,
  BsChevronRight,
  BsBookmarksFill,
  BsCash
} from "react-icons/bs";
import { Link } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [isStudentsOpen, setStudentsOpen] = useState(false);
  const [isCoursesOpen, setCoursesOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isFeesOpen, setFeesOpen] = useState(false);

  const toggleCourses = () => setCoursesOpen(!isCoursesOpen);
  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);
  const toggleStudents = () => setStudentsOpen(!isStudentsOpen);
  const toggleFees = () => setFeesOpen(!isFeesOpen);

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsFillCCircleFill  className="icon_header" /> Institute
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          Close
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/" >
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <div
            onClick={toggleStudents}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <BsPeopleFill className="icon" /> Student Registration
            {isStudentsOpen ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          {isStudentsOpen && (
            <ul className="sidebar-submenu">
              <li>
                <Link to="/students/addstudent">Add Student</Link>
              </li>
              <li>
              <Link to="/students/allstudents">Student List</Link>
              </li>
              <li>
                <a href="">Inactive Students</a>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-list-item">
          <div
            onClick={toggleFees}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <BsCash className="icon" /> Fee Management
            {isFeesOpen ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          {isFeesOpen && (
            <ul className="sidebar-submenu">
              <li>
              <Link to="/fee management/feehead">Fee head</Link>
              </li>
              <li>
              <Link to="/fee management/classhead">Class fee head</Link>
              </li>
              <li>
              <Link to="/fee management/feesubmission">Fee submission</Link>
              </li>
              <li>
              <Link to="/fee management/feereport">Show fee report</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-list-item">
          <div
            onClick={toggleCourses}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            < BsFillArchiveFill className="icon" /> Courses
            {isCoursesOpen ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          {isCoursesOpen && (
            <ul className="sidebar-submenu">
              <li>
              <Link to="/course/addcourse">Add course</Link>
              </li>
              <li>
              <Link to="/course/allcourse">All course</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-list-item">
          <Link to="/certificate" >
            <BsBookmarksFill className="icon" /> Upload Certificate
          </Link>
        </li>
        <li className="sidebar-list-item">
          <div
            onClick={toggleSettings}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <BsFillGearFill className="icon" /> Setting
            {isSettingsOpen ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          {isSettingsOpen && (
            <ul className="sidebar-submenu">
              <li>
                <a href="">Profile Settings</a>
              </li>
              <li>
                <a href="">Account Settings</a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
