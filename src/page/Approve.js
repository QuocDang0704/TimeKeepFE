import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "react-js-pagination";

const Approve = () => {
    const [pageSize, setPageSize] = useState(5);
    const [pageCurr, setPageCurr] = useState(1);
    const [lstDataApprove, setLstDataApprove] = useState([]);
    const [lstDataApproveDis, setLstDataApproveDis] = useState([]);

    const [idUpdate, setIdUpdate] = useState('');
    const [status, setStatus] = useState('');
    const [note, setNote] = useState('');

    const [statusUpdate, setStatusUpdate] = useState(1);
    const [isCancel, setIsCancel] = useState(false);

    // item search
    const [idStatusSearch, setIdStatusSearch] = useState('');
    useEffect(() => {
        const idPosition = sessionStorage.getItem('positionId');
        if (idPosition.trim() === '' || idPosition === undefined || Number(idPosition) !== 1) {
            window.location = '/';
            return;
        }
        axios.get(`http://localhost:8080/api/permit/permits`).then(resp => {
            if (resp?.status === 200) {
                const tmpLstDataApprove = resp?.data ? resp.data : [];
                setLstDataApprove(tmpLstDataApprove);
                const tmpLstDataApproveDis = handleShowDataApproveCurr(pageCurr, pageSize, tmpLstDataApprove);
                setLstDataApproveDis(tmpLstDataApproveDis);
            }
        }).catch(error => console.log('Error get time keep'));
    }, []);
    const handleShowDataApproveCurr = (page, pageSizeCurr, totalItem) => {
        const indexStart = page === 1 ? 0 : (page * (pageSizeCurr - 1));
        const indexEnd = indexStart + pageSizeCurr;
        return totalItem?.slice(indexStart, indexEnd);
    }
    const handleFormatDate = (date) => {
        const newDate = moment(date).format('yyyy-MM-DD HH:MM:ss');
        if (newDate !== 'Invalid date') {
            return newDate;
        } return '';
    }
    const _renderHeaderListApprove = () => (
        <thead>
            <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name staff</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Note
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Reason</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Status</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Time in</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Time out</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" ></th>
            </tr>
        </thead>
    )
    const handleChangePageSize = (event) => {
        const { value } = event.target;
        setPageSize(Number(value));
        setPageCurr(1)
        setLstDataApproveDis(handleShowDataApproveCurr(1, Number(value), lstDataApprove));
    }
    const handlePageChange = (value) => {
        setPageCurr(value);
        setLstDataApproveDis(handleShowDataApproveCurr(Number(value), pageSize, lstDataApprove));
    }
    const getStatusName = (value, isCancel) => {
        switch (value) {
            case 1:
                return 'Approved';
            case 0:
                if (isCancel) {
                    return 'Cancel';
                }
                return 'Waiting Approve';
        }
    }
    const handleData = (value) => {
        setIdUpdate(value?.id);
        setStatus(value?.status);
        setIsCancel(value?.isCancel);
    }
    const btnDisabled = () => {
        if (status === 1 || !note || note === '' || isCancel === true) {
            return true;
        }
        return false;
    }
    const handleUpdateConfirm = () => {
        if (status === 1 || !note || note === '') {
            return;
        }
        const paramPut = {
            id: idUpdate,
            note: note,
            status: Number(statusUpdate)
        };
        axios.put(`http://localhost:8080/api/permit/approve`, paramPut).then(resp => {
            if (resp?.status === 200) {
                toast.success('Update permit success');
                axios.get(`http://localhost:8080/api/permit/permits`).then(resp => {
                    if (resp?.status === 200) {
                        const tmpLstDataApprove = resp?.data ? resp.data : [];
                        setLstDataApprove(tmpLstDataApprove);
                        const tmpLstDataApproveDis = handleShowDataApproveCurr(1, pageSize, tmpLstDataApprove);
                        setLstDataApproveDis(tmpLstDataApproveDis);
                    }
                }).catch(error => toast.error('Error get approve data'));
            }
        }).catch(error => toast.error('Error approve'));
    }
    const _renderModalUpdate = () => {
        return <div className="modal fade" id="updateModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Approve</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group d-flex">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                                    <label htmlFor="recipient-name" className="col-form-label text-nowrap">Status</label>
                                </div>
                                <select value={statusUpdate} onChange={(event) => setStatusUpdate(event.target.value)} name="" id="input" className="form-control">
                                    <option value={1}>Approve</option>
                                    <option value={0}>UnApprove</option>
                                </select>
                            </div>
                            <div className="form-group d-flex">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                                    <label htmlFor="recipient-name" className="col-form-label text-nowrap">Note</label>
                                </div>

                                <input value={note} onChange={(event) => setNote(event.target.value)} type="text" placeholder="Reason" id="input" class="form-control" required="required" title="" />

                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" disabled={btnDisabled()} onClick={handleUpdateConfirm} data-dismiss="modal" className="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    }
    const _renderDataApprove = () => (
        lstDataApproveDis?.map((item, ind) => {
            return <tr key={ind}>
                <td>
                    <span className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{item?.nameStaff}</span>
                </td>
                <td>
                    <span className="text-secondary text-xs font-weight-bold">{item?.email}</span>
                </td>
                <td className="align-middle text-center text-sm">
                    <span className="text-secondary text-xs font-weight-bold">{item?.note}</span>
                </td>
                <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{item?.reason}</span>
                </td>
                <td className="align-middle text-center">
                    <span className={`text-secondary text-xs font-weight-bold ${item.status === 1 ? '' : 'text-danger'}`}>{getStatusName(item?.status, item?.isCancel)}</span>
                </td>
                <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{handleFormatDate(item?.timeIn)}</span>
                </td>
                <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{handleFormatDate(item?.timeOut)}</span>
                </td>
                <td className="align-middle text-center">
                    <a type="button" onClick={() => handleData(item)} className="btn btn-primary" data-toggle="modal" data-target="#updateModal" data-whatever="@getbootstrap">
                        <i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                </td>
            </tr>
        })
    )
    const _renderListTableApprove = () => {
        return <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
                {_renderHeaderListApprove()}
                <tbody>
                    {_renderDataApprove()}
                </tbody>
            </table>
        </div>
    }
    const handleSearch = () => {
        if (idStatusSearch !== '') {
            setPageCurr(1);
            axios.get(`http://localhost:8080/api/permit/permits/status?status=${Number(idStatusSearch)}`).then(resp => {
                if (resp?.status === 200) {
                    const tmpLstDataApprove = resp?.data ? resp.data : [];
                    setLstDataApprove(tmpLstDataApprove);
                    const tmpLstDataApproveDis = handleShowDataApproveCurr(1, pageSize, tmpLstDataApprove);
                    setLstDataApproveDis(tmpLstDataApproveDis);
                }
            }).catch(error => console.log('Error get approve search'));
        }
        else {
            axios.get(`http://localhost:8080/api/permit/permits`).then(resp => {
                if (resp?.status === 200) {
                    const tmpLstDataApprove = resp?.data ? resp.data : [];
                    setLstDataApprove(tmpLstDataApprove);
                    const tmpLstDataApproveDis = handleShowDataApproveCurr(1, pageSize, tmpLstDataApprove);
                    setLstDataApproveDis(tmpLstDataApproveDis);
                }
            }).catch(error => console.log('Error get approve data'));
        }
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
                                        <h2>Approve <b>Permit</b></h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-2 d-flex">
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-flex">
                                        <label className="text-nowrap mt-3 mr-3">Status</label>
                                        <select value={idStatusSearch} onChange={(event) => setIdStatusSearch(event.target.value)}
                                            id="input" className="form-control w-30rem mt-2" required="required">
                                            <option value="">All</option>
                                            <option value="1">Approved</option>
                                            <option value="0">Waiting Approved</option>
                                        </select>

                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 mt-1 ml-3">
                                        <button type="button" class="btn btn-info text-nowrap" onClick={handleSearch}>Search</button>
                                    </div>
                                </div>
                                {_renderListTableApprove()}
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
                    totalItemsCount={lstDataApprove?.length}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange}
                />
            </div>
        </main>
        {_renderModalUpdate()}
        <ToastContainer />
    </div>
}
export default Approve;