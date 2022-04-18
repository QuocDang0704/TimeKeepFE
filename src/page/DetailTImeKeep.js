import { useEffect, useState } from "react";
import MenuStaff from "./MenuStaff";
import axios from 'axios';
import moment from 'moment';
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const DetailTimeKeep = () => {
    const [idStaff, setIdStaff] = useState();
    const [monthSearch, setMonthSearch] = useState();
    const [lstData, setLstData] = useState([]);
    const [lstDataDis, setLstDataDis] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageCurr, setPageCurr] = useState(1);

    const [idTimeKeepCurr, setIdTimeKeepCurr] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const [reason, setReason] = useState('');
    useEffect(() => {
        const idStaffSess = sessionStorage.getItem('idStaff');
        if (idStaffSess.trim() === '' || idStaffSess === undefined || idStaffSess === null) {
            window.location = '/';
            return;
        }
        setIdStaff(idStaffSess);
        if (!monthSearch || monthSearch.trim() === '') {
            axios.get(`http://localhost:8080/apiTimeKeeps/timekeep/history?idStaff=${Number(idStaffSess)}`).then(resp => {
                if (resp?.status === 200) {
                    const tmpData = resp?.data;
                    if (tmpData) {
                        setLstData(resp?.data);
                        setLstDataDis(handleShowDataTimeKeepCurr(pageCurr, pageSize, resp?.data));
                    }
                }
            }).catch(error => {
                setLstData([]);
                setLstDataDis(handleShowDataTimeKeepCurr(pageCurr, pageSize, []));
            });
        }
        else {
            axios.get(`http://localhost:8080/apiTimeKeeps/timekeep/history?idStaff=${Number(idStaffSess)}&&&month=${Number(monthSearch)}`).then(resp => {
                if (resp?.status === 200) {
                    const tmpData = resp?.data;
                    if (tmpData) {
                        setLstData(resp?.data);
                        setLstDataDis(handleShowDataTimeKeepCurr(pageCurr, pageSize, resp?.data));
                    }
                }
            }).catch(error => {
                setLstData([]);
                setLstDataDis(handleShowDataTimeKeepCurr(pageCurr, pageSize, []));
            });
        }
    }, [monthSearch]);
    const handleFormatDate = (date) => {
        const newDate = moment(date).format('yyyy-MM-DD HH:MM:ss');
        if (newDate !== 'Invalid date') {
            return newDate;
        } return '';
    }
    const handleFromDate = (event) => {
        setFromDate(event.target.value);
    }
    const handleToDate = (event) => {
        setToDate(event.target.value);
    }
    const handleConfirm = () => {
        const tmpFromDate = moment(fromDate).format('yyyy-MM-DD HH:mm:ss');
        const tmpToDate = moment(toDate).format('yyyy-MM-DD HH:mm:ss');
        const param = {
            idTimeKeep: Number(idTimeKeepCurr),
            reason: reason,
            timeIn: tmpFromDate,
            timeOut: tmpToDate
        }
        axios.post(`http://localhost:8080/permit/create`, param).then(resp => {
            if (resp?.status === 200);
            toast.success('Create Permit Success');
            setReason('');
            setIdTimeKeepCurr('');
            setFromDate('');
            setToDate('');
        }).catch(err => toast.error('Create Permit Failse'))
    }
    const btnDisabled = () => {
        if (!reason || reason.trim() === '') {
            return true;
        }
        if (!fromDate || !toDate) {
            return true;
        }
        const tmpFromDate = new Date(fromDate).getTime();
        const tmpToDate = new Date(toDate).getTime();
        if (tmpFromDate <= 0 || tmpToDate <= 0) {
            return true;
        }
        return false;
    }
    const _renderHeaderTimeKeep = () => (
        <thead>
            <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name position</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name Staff</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Time Check In
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Time Check Out</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Shift</th>
                <th className="text-secondary opacity-7" />
            </tr>
        </thead>
    )
    const _renderDataTable = () => (
        lstDataDis?.map((item, ind) => {
            return <tr key={ind}>
                <td>
                    <span className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{item?.namePosition}</span>
                </td>
                <td>
                    <span className="text-secondary text-xs font-weight-bold">{item?.nameStaff}</span>
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
                <td className="align-middle text-center" onClick={() => setIdTimeKeepCurr(item?.id)}>
                    <a type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateModal" data-whatever="@getbootstrap"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                </td>
            </tr>
        })
    )
    const _renderModalUpdate = () => {
        return <div className="modal fade" id="updateModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Permit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <div className="d-flex">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                                        <label htmlFor="message-text" className="col-form-label mr-5 text-nowrap">Reason</label>
                                    </div>
                                    <input value={reason} onChange={(event) => setReason(event.target.value)} name="" id="input" className="form-control" required="required" title="" />
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                                    <label htmlFor="recipient-name" className="col-form-label text-nowrap">From Date</label>
                                </div>
                                <input value={fromDate} type="datetime-local" onChange={handleFromDate} name="" id="input" class="form-control" required="required" title="" />
                            </div>
                            <div className="form-group d-flex">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                                    <label htmlFor="recipient-name" className="col-form-label text-nowrap">To Date</label>
                                </div>
                                <input value={toDate} type="datetime-local" onChange={handleToDate} name="" id="input" class="form-control" required="required" title="" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button disabled={btnDisabled()} type="button" data-dismiss="modal" className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div >
        </div >
    }
    const _renderLstTimeKeep = () => (
        <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
                {_renderHeaderTimeKeep()}
                <tbody>
                    {_renderDataTable()}
                </tbody>
            </table>
        </div>
    )
    const handleShowDataTimeKeepCurr = (page, pageSizeCurr, totalItem) => {
        const indexStart = page === 1 ? 0 : (page * (pageSize - 1));
        const indexEnd = indexStart + pageSizeCurr;
        return totalItem?.slice(indexStart, indexEnd);
    }
    const handleChangePageSize = (event) => {
        const { value } = event.target;
        setPageSize(value);
        setPageCurr(1)
        setLstDataDis(handleShowDataTimeKeepCurr(1, Number(value), lstData));
    }
    const handlePageChange = (value) => {
        setPageCurr(value);
        setLstDataDis(handleShowDataTimeKeepCurr(Number(value), pageSize, lstData));
    }
    return <div>
        <MenuStaff />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <div className="col-sm-6">
                                        <h2>Checkin or checkout</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-2 d-flex">
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 mt-1">
                                        <span class="label">Search Month</span>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                        <select value={monthSearch} onChange={(event) => setMonthSearch(event.target.value)} name="" id="input" class="form-control" required="required">
                                            <option value="">All</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>
                                </div>
                                {_renderLstTimeKeep()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {_renderModalUpdate()}
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
                    totalItemsCount={lstData?.length}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange}
                />
            </div>
        </main >
        <ToastContainer />
    </div >
}
export default DetailTimeKeep;