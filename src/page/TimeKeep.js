import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "react-js-pagination";

const TimeKeep = () => {
    const [lstTimeKeep, setLstTimeKeep] = useState([]);
    const [lstTimeKeepDis, setLstTimeKeepDis] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageCurr, setPageCurr] = useState(1);

    // item Search
    const [idPositionSearch, setIdPositionSearch] = useState('2');
    const [nameSearch, setNameSearch] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    useEffect(() => {
        const idPosition = sessionStorage.getItem('positionId');
        if (idPosition.trim() === '' || idPosition === undefined || Number(idPosition) !== 1) {
            window.location = '/';
            return;
        }
        axios.get(`http://localhost:8080/apiTimeKeeps/timekeep`).then(resp => {
            if (resp?.status === 200) {
                const tmpLstTimeKeep = resp?.data ? resp.data : [];
                const tmpLstTimeKeepDis = handleShowDataTimeKeepCurr(pageCurr, pageSize, tmpLstTimeKeep);
                setLstTimeKeep(tmpLstTimeKeep);
                setLstTimeKeepDis(tmpLstTimeKeepDis);
            }
        }).catch(error => console.log('Error get time keep'));
    }, []);
    const handleShowDataTimeKeepCurr = (page, pageSizeCurr, totalItem) => {
        const indexStart = page === 1 ? 0 : (page * (pageSize - 1));
        const indexEnd = indexStart + pageSizeCurr;
        return totalItem?.slice(indexStart, indexEnd);
    }
    const _renderHeaderListTime = () => (
        <thead>
            <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name staff</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Position</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Start Time</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Stop Time</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Shift</th>
            </tr>
        </thead>
    )
    const getPositionName = (idPosition) => {
        switch (idPosition) {
            case 1:
                return 'Trưởng phòng';
            case 2:
                return 'Nhân viên';
            case 3:
                return 'Lao Công';
        }
    }
    const handleFormatDate = (date) => {
        const newDate = moment(date).format('yyyy-MM-DD HH:MM:ss');
        if (newDate !== 'Invalid date') {
            return newDate;
        } return '';
    }
    const handleChangePageSize = (event) => {
        const { value } = event.target;
        setPageSize(Number(value));
        setPageCurr(1)
        setLstTimeKeepDis(handleShowDataTimeKeepCurr(1, Number(value), lstTimeKeep));
    }
    const handlePageChange = (value) => {
        setPageCurr(value);
        setLstTimeKeepDis(handleShowDataTimeKeepCurr(Number(value), pageSize, lstTimeKeep));
    }
    const handleToDate = (event) => {
        const { value } = event.target;
        setToDate(value);
    }
    const handleFromDate = (event) => {
        setFromDate(event.target.value);
    }
    const handleSeach = (is) => {
        let tmpLstTimeKeep = [...lstTimeKeep];
        if (idPositionSearch) {
            tmpLstTimeKeep = tmpLstTimeKeep.filter(item => item.idPosition === Number(idPositionSearch));
        }
        if (nameSearch) {
            tmpLstTimeKeep = tmpLstTimeKeep.filter(item => item.nameStaff.toUpperCase() === nameSearch.toUpperCase);
        }
        const fromGetTime = new Date(fromDate).setHours(0, 0, 0, 0);
        const toGetTime = new Date(toDate).setHours(23, 59, 59, 999);

        if (fromGetTime > 0) {
            tmpLstTimeKeep = tmpLstTimeKeep.filter(item => new Date(item.startTimeApproved).getTime() > fromGetTime);
        }
        if (toGetTime > 0) {
            tmpLstTimeKeep = tmpLstTimeKeep.filter(item => new Date(item.stopTimeApproved).getTime() < toGetTime)
        }
        if (is) {
            setPageCurr(1);
            setLstTimeKeepDis(handleShowDataTimeKeepCurr(1, pageSize, tmpLstTimeKeep));
        }
        setLstTimeKeepDis(handleShowDataTimeKeepCurr(pageCurr, pageSize, tmpLstTimeKeep));
    }
    const _renderDataTableTime = () => (
        lstTimeKeepDis?.map((item, ind) => {
            return <tr key={ind}>
                <td>
                    <span className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{item?.nameStaff}</span>
                </td>
                <td>
                    <span className="text-secondary text-xs font-weight-bold">{getPositionName(item?.idPosition)}</span>
                </td>
                <td className="align-middle text-center text-sm">
                    <span className="text-secondary text-xs font-weight-bold">{item?.email}</span>
                </td>
                <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{handleFormatDate(item?.startTimeApproved)}</span>
                </td>
                <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{handleFormatDate(item?.stopTimeApproved)}</span>
                </td>
                <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{item?.idTimeWork}</span>
                </td>
            </tr>
        })
    )
    const _renderListTableTime = () => {
        return <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
                {_renderHeaderListTime()}
                <tbody>
                    {_renderDataTableTime()}
                </tbody>
            </table>
        </div>
    }
    return <div>
        <Menu />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <div className="col-sm-6">
                                        <h2>Manage <b>Time Keep</b></h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-2 d-flex">
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-flex">
                                        <label className="text-nowrap mt-2 mr-3">Position</label>
                                        <select value={idPositionSearch} onChange={(event) => setIdPositionSearch(event.target.value)} name="" id="input" class="form-control" required="required">
                                            <option value="1">Trưởng phòng</option>
                                            <option value="2">Nhân viên</option>
                                            <option value="3">Lao công</option>
                                        </select>

                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-flex">
                                        <label className="text-nowrap mt-2 mr-3">Name Staff</label>
                                        <input value={nameSearch} onChange={(event) => setNameSearch(event.target.value)} type="text" name="" id="input" className="form-control" required="required" title="" />
                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-3 col-lg-3 d-flex">
                                        <label className="text-nowrap mt-2 mr-3">From Date</label>
                                        <input value={fromDate} onChange={handleFromDate} type="date" name="" id="input" className="form-control" required="required" title="" />
                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-flex">
                                        <label className="text-nowrap mt-2 mr-3">To Date</label>
                                        <input value={toDate} onChange={handleToDate} type="date" name="" id="input" className="form-control" required="required" title="" />
                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-flex ms-7">
                                        <button type="button" class="btn btn-info text-nowrap" onClick={() => handleSeach(true)}>Search</button>
                                    </div>
                                </div>
                                {_renderListTableTime()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <div className="form-group d-flex">
                    <label for="input" className="mt-1 col-sm-2 control-label text-nowrap mr-5">Page Size:</label>
                    <select value={pageSize} onChange={handleChangePageSize} name="" id="input">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <Pagination
                    firstPageText="<<"
                    lastPageText=">>"
                    nextPageText=">"
                    prevPageText="<"
                    activePage={pageCurr}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={lstTimeKeep?.length}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange}
                />
            </div>
        </main>

        <ToastContainer />
    </div>
}
export default TimeKeep;