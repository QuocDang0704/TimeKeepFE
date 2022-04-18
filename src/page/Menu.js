import { Link } from "react-router-dom";

const Menu = () => {
  return <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
      <a className="navbar-brand m-0" href="#" target="_blank">
        <img src="../assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
        <span className="ms-1 font-weight-bold text-white">Manager Staff</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2" />
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-white " href="../pages/dashboard.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
            </div>
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to={"/staffs"}>
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">table_view</i>
            </div>
            <span className="nav-link-text ms-1">Manage Staff</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white " to={"/timekeep"} >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-kanban" viewBox="0 0 16 16">
                <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z" />
                <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z" />
              </svg>
            </div>
            <span className="nav-link-text ms-1">Manage time keep</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white " to={"/approve"} >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">notifications</i>
            </div>
            <span className="nav-link-text ms-1">Approve</span>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="../pages/profile.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">person</i>
            </div>
            <span className="nav-link-text ms-1">Profile</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white ">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">assignment</i>
            </div>
            <Link to="/"><span className="nav-link-text ms-1">Log out</span></Link>
          </a>
        </li>
      </ul>
    </div>
    <div className="sidenav-footer position-absolute w-100 bottom-0 ">
      <div className="mx-3">
        <a className="btn bg-gradient-primary mt-4 w-100" href="https://www.facebook.com/BaoQuoc0407/" type="button">View
          Admin</a>
      </div>
    </div>
  </aside>
}
export default Menu;