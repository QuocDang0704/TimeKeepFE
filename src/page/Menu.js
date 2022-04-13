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
              <i className="material-icons opacity-10">notifications</i>
            </div>
            <span className="nav-link-text ms-1">Manage time keep</span>
          </Link>
        </li>
        <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
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