import Menu from "./Menu";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import Pagination from "react-js-pagination";

const Table = () => {
  const [listStaff, setListStaff] = useState([]);
  const [listStaffDis, setListStaffDis] = useState([]);
  const [idDelete, setIdDelete] = useState(0);
  const [success, setSuccess] = useState(0);
  const [lstPosition, setLstPosition] = useState([]);

  // Update Error
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorBlankEmail, setIsErrorBlankEmail] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isErrorBlankAddress, setErrorBlankAddress] = useState(false);
  const [isExistEmail, setIsExistEmail] = useState(false);

  // item Update
  const [idUpdate, setIdUpdate] = useState(0);
  const [idPositionUpdate, setIdPositionUpdate] = useState('');
  const [nameUpdate, setNameUpdate] = useState('');
  const [genderUpdate, setGenderUpdate] = useState('');
  const [emailUpdate, setEmailUpdate] = useState('');
  const [addressUpdate, setAddressUpdate] = useState('');

  // item insert
  const [idPositionAdd, setIdPositionAdd] = useState('');
  const [nameAdd, setNameAdd] = useState('');
  const [genderAdd, setGenderAdd] = useState('');
  const [emailAdd, setEmailAdd] = useState('');
  const [addressAdd, setAddressAdd] = useState('');

  // Insert Error
  const [isErrorNameAdd, setIsErrorNameAdd] = useState(false);
  const [isErrorBlankEmailAdd, setIsErrorBlankEmailAdd] = useState(false);
  const [isInvalidEmailAdd, setIsInvalidEmailAdd] = useState(false);
  const [isErrorBlankAddressAdd, setErrorBlankAddressAdd] = useState(false);
  const [isInsertExistEmail, setIsInsertExistEmail] = useState(false);

  // Pagination 
  const [pageCurr, setPageCurr] = useState(1);
  const [pageSize, setPageSize] = useState(5);



  useEffect(() => {
    const idPosition = sessionStorage.getItem('positionId');
    if (idPosition.trim() === '' || idPosition === undefined || Number(idPosition) !== 1) {
      window.location = '/';
      return;
    }
    if (success === 0) {
      axios.get(`http://localhost:8080/apiPositions/positions`).then(resp => {
        const tmpPosition = resp?.data ? resp?.data : [];
        setLstPosition(tmpPosition);
      }).catch(err => console.log('error get position'))
    }
    axios.get(`http://localhost:8080/apiStaffs/staffs`).then(resp => {
      const tmpLstStaff = resp?.data ? resp?.data : [];
      const lstStaffDis = handleShowDataStaffCurr(pageCurr, pageSize, tmpLstStaff);
      setListStaffDis(lstStaffDis);
      setListStaff(tmpLstStaff);

    }).catch(err => console.log('error get staff'));
  }, [success]);
  const handleShowDataStaffCurr = (page, pageSizeCurr, totalItem) => {
    const indexStart = page === 1 ? 0 : (page * (pageSize - 1));
    const indexEnd = indexStart + pageSizeCurr;
    return totalItem?.slice(indexStart, indexEnd);
  }
  const _renderPopUpInsert = () => (
    <div className="modal fade" id="insertModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Staff</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group d-flex">
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  <label htmlFor="recipient-name" className="col-form-label text-nowrap">Name Position</label>
                </div>
                <select value={idPositionUpdate} onChange={(event) => setIdPositionUpdate(event.target.value)} name="" id="input" className="form-control">
                  {_renderPositon()}
                </select>
              </div>
              <div className="form-group">
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                    <label htmlFor="message-text" className="col-form-label mr-5 text-nowrap">Name Staff</label>
                  </div>
                  <input value={nameAdd} onChange={handleChangeNameAdd} name="" id="input" className="form-control" required="required" title="" />
                </div>
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  </div>
                  {isErrorNameAdd && <div className="text-danger">Name cannot be blank</div>}
                </div>

              </div>
              <div className="form-group d-flex">
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  <label htmlFor="recipient-name" className="col-form-label text-nowrap">Gender Staff</label>
                </div>
                <select value={genderAdd} onChange={(event) => setGenderAdd(event.target.value)} name="" id="input" className="form-control">
                  <option value="false">Women</option>
                  <option value="true">Man</option>
                </select>
              </div>
              <div className="form-group">
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                    <label htmlFor="recipient-name" className="col-form-label text-nowrap">Email</label>
                  </div>
                  <input value={emailAdd} onChange={handleChangeEmailAdd} type="email" id="input" className="form-control" required="required" title="" />
                </div>
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  </div>
                  {isErrorBlankEmailAdd && <div className="text-danger">Email cannot be blank</div>}
                  {isInvalidEmailAdd && <div className="text-danger">Email invalid</div>}
                  {isInsertExistEmail && <div className="text-danger">Email is Exit</div>}
                </div>
              </div>
              <div className="form-group">
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                    <label htmlFor="recipient-name" className="col-form-label text-nowrap">Address</label>
                  </div>
                  <input value={addressAdd} onChange={handleChangeAddressAdd} name="" id="input" className="form-control" required="required" title="" />
                </div>
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  </div>
                  {isErrorBlankAddressAdd && <div className="text-danger">Address cannot be blank</div>}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" disabled={btnDisabledInsert()} data-dismiss="modal" onClick={handleAddConfirm} className="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )

  const _renderPositon = () => (
    lstPosition?.map((item, index) => {
      return <option key={index} value={item?.id}>{item?.namePosition}</option>
    })
  )

  const handleChangeName = (event) => {
    const { value } = event.target;
    setNameUpdate(value);
    if (event.target.value.trim() === '') {
      setIsErrorName(true);
      return;
    }
    setIsErrorName(false);
  }
  const handleChangeNameAdd = (event) => {
    const { value } = event.target;
    setNameAdd(value);
    if (event.target.value.trim() === '') {
      setIsErrorNameAdd(true);
      return;
    }
    setIsErrorNameAdd(false);
  }
  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmailUpdate(value);
    if (event.target.value.trim() === '') {
      setIsInvalidEmail(false);
      setIsErrorBlankEmail(true);
      return;
    }
    if (!validator.isEmail(value)) {
      setIsInvalidEmail(true);
      setIsErrorBlankEmail(false);
      return;
    }
    setIsInvalidEmail(false);
    setIsErrorBlankEmail(false);
    //check email exist
    axios.get(`http://localhost:8080/apiStaffs/staffs/findby${value}`).then(resp => {
      if (resp?.data != '') {
        setIsExistEmail(true);
        return;
      }
      setIsExistEmail(false);
    }).catch(err => console.log('error get position'))


  }
  const handleChangeEmailAdd = (event) => {
    const { value } = event.target;
    setEmailAdd(value);
    if (event.target.value.trim() === '') {
      setIsInvalidEmailAdd(false);
      setIsErrorBlankEmailAdd(true);
      return;
    }
    if (!validator.isEmail(value)) {
      setIsInvalidEmailAdd(true);
      setIsErrorBlankEmailAdd(false);
      return;
    }
    setIsInvalidEmailAdd(false);
    setIsErrorBlankEmailAdd(false);
    axios.get(`http://localhost:8080/apiStaffs/staffs/findby${value}`).then(resp => {
      console.log(191, resp);
      if (resp?.data != '') {
        setIsInsertExistEmail(true);
        return;
      }
      // if (resp?.data.email != '') {
      //   setIsInsertExistEmail(true);
      //   return;
      // }
      setIsInsertExistEmail(false);
    }).catch(err => console.log('error get position'))

  }
  const handleChangeAddress = (event) => {
    const { value } = event.target;
    setAddressUpdate(value);
    if (value.trim() === '') {
      setErrorBlankAddress(true);
      return;
    }
    setErrorBlankAddress(false);
  }
  const handleChangeAddressAdd = (event) => {
    const { value } = event.target;
    setAddressAdd(value);
    if (value.trim() === '') {
      setErrorBlankAddressAdd(true);
      return;
    }
    setErrorBlankAddressAdd(false);
  }
  const btnDisabled = () => {
    const invalidName = nameUpdate.trim() === '';
    const invalidAddress = addressUpdate.trim() === '';
    const invalidEmail = !validator.isEmail(emailUpdate);
    const blankEmail = emailUpdate.trim() === '';
    if (invalidName || invalidAddress || invalidEmail || blankEmail || isExistEmail) {
      return true;
    } return false;
  }
  const btnDisabledInsert = () => {
    const invalidName = nameAdd.trim() === '';
    const invalidAddress = addressAdd.trim() === '';
    const invalidEmail = !validator.isEmail(emailAdd);
    const blankEmail = emailAdd.trim() === '';
    if (invalidName || invalidAddress || invalidEmail || blankEmail || isInsertExistEmail) {
      return true;
    } return false;
  }
  const handleUpdateConfirm = () => {
    const param = {
      id: Number(idUpdate),
      name: nameUpdate,
      gender: Boolean(genderUpdate),
      idPosition: Number(idPositionUpdate),
      email: emailUpdate,
      adress: addressUpdate
    }
    axios.put(`http://localhost:8080/apiStaffs/staffs`, param).then(resp => {
      if (resp?.status === 200) {
        toast.success('Update success');
        setSuccess(success + 1);
      }
    }).catch((error) => toast.error('Update false'))
  }
  const handleAddConfirm = () => {
    const param = {
      id: null,
      name: nameAdd,
      gender: Boolean(genderAdd),
      idPosition: Number(idPositionAdd),
      email: emailAdd,
      adress: addressAdd
    }
    axios.post(`http://localhost:8080/apiStaffs/staff`, param).then(resp => {
      if (resp?.status === 200) {
        toast.success('Add Staff success');
        setSuccess(success + 1);
        setNameAdd('');
        setGenderAdd(false);
        setIdPositionAdd('');
        setEmailAdd('');
        setAddressAdd('');
      }
    }).catch((error) => toast.error('Add Staff false'))
  }
  const _renderModalUpdate = () => {
    return <div className="modal fade" id="updateModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group d-flex">
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  <label htmlFor="recipient-name" className="col-form-label text-nowrap">Name Position</label>
                </div>
                <select value={idPositionUpdate} onChange={(event) => setIdPositionUpdate(event.target.value)} name="" id="input" className="form-control">
                  {_renderPositon()}
                </select>
              </div>
              <div className="form-group">
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                    <label htmlFor="message-text" className="col-form-label mr-5 text-nowrap">Name Staff</label>
                  </div>
                  <input value={nameUpdate} onChange={handleChangeName} name="" id="input" className="form-control" required="required" title="" />
                </div>
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  </div>
                  {isErrorName && <div className="text-danger">Name cannot be blank</div>}
                </div>

              </div>
              <div className="form-group d-flex">
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  <label htmlFor="recipient-name" className="col-form-label text-nowrap">Gender Staff</label>
                </div>
                <select value={genderUpdate} onChange={(event) => setGenderUpdate(event.target.value)} name="" id="input" className="form-control">
                  <option value="false">Women</option>
                  <option value="true">Man</option>
                </select>
              </div>
              <div className="form-group">
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                    <label htmlFor="recipient-name" className="col-form-label text-nowrap">Email</label>
                  </div>
                  <input value={emailUpdate} onChange={handleChangeEmail} type="email" id="input" className="form-control" required="required" title="" />
                </div>
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  </div>
                  {isErrorBlankEmail && <div className="text-danger">Email cannot be blank</div>}
                  {isInvalidEmail && <div className="text-danger">Email invalid</div>}
                  {isExistEmail && <div className="text-danger">Email is Exist</div>}
                </div>
              </div>
              <div className="form-group">
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                    <label htmlFor="recipient-name" className="col-form-label text-nowrap">Address</label>
                  </div>
                  <input value={addressUpdate} onChange={handleChangeAddress} name="" id="input" className="form-control" required="required" title="" />
                </div>
                <div className="d-flex">
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-left">
                  </div>
                  {isErrorBlankAddress && <div className="text-danger">Address cannot be blank</div>}
                </div>
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

  const handleDeteleStaff = () => {
    axios.delete(`http://localhost:8080/apiStaffs/staffs/delete?idStaff=${idDelete}`, '').then(resp => {
      if (resp?.status === 200) {
        toast("Delete success");
        setSuccess(success + 1);
      }
    }).catch(error => toast('Delete false'));
  }
  const _renderDelete = () => {
    return <div className="modal fade" id="deleteModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Are you sure want to delete ?</h5>

            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {/* <form> */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onClick={handleDeteleStaff} data-dismiss="modal" className="btn btn-primary">Save changes</button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  }
  const _renderHeaderListStaff = () => (
    <thead>
      <tr>
        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name position</th>
        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name Staff</th>
        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Gender
        </th>
        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
          Email</th>
        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
          Address</th>
        <th className="text-secondary opacity-7" />
      </tr>
    </thead>
  )
  const getGender = (item) => {
    return item ? 'Men' : 'Women';
  }
  const handleUpdate = (itemUpdate) => {
    setIdUpdate(itemUpdate?.id);
    setIdPositionUpdate(itemUpdate?.idPosition);
    setNameUpdate(itemUpdate?.name);
    setGenderUpdate(itemUpdate?.gender);
    setEmailUpdate(itemUpdate.email);
    setAddressUpdate(itemUpdate.adress);
  }
  const _renderDataTable = () => (
    listStaffDis?.map((item, ind) => {
      return <tr key={ind}>
        <td>
          <span className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{item?.namePosition}</span>
        </td>
        <td>
          <span className="text-secondary text-xs font-weight-bold">{item?.name}</span>
        </td>
        <td className="align-middle text-center text-sm">
          <span className="text-secondary text-xs font-weight-bold">{getGender(item?.gender)}</span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">{item?.email}</span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">{item?.adress}</span>
        </td>
        <td className="align-middle">
          {/* Update */}
          <a type="button" onClick={() => handleUpdate(item)} className="btn btn-primary" data-toggle="modal" data-target="#updateModal" data-whatever="@getbootstrap"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>

          {/* delete */}
          <a href="#" onClick={() => setIdDelete(item.id)} className="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
            <i className="material-icons" data-toggle="tooltip" title="Delete"></i>
          </a>
        </td>
      </tr>
    })
  )
  const _renderListStaff = () => (
    <div className="table-responsive p-0">
      <table className="table align-items-center mb-0">
        {_renderHeaderListStaff()}
        <tbody>
          {_renderDataTable()}
        </tbody>
      </table>
    </div>
  )

  const handleAddStaff = () => {
    setIdPositionAdd(lstPosition[0]?.id.toString());
    setGenderAdd('false');
  }
  const handlePageChange = (event) => {
    setPageCurr(event);
    setListStaffDis(handleShowDataStaffCurr(event, pageSize, listStaff));
  }
  const handleChangePageSize = (event) => {
    const { value } = event.target;
    setPageSize(Number(value));
    setPageCurr(1);
    setListStaffDis(handleShowDataStaffCurr(1, Number(value), listStaff))
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
                    <h2>Manage <b>Staff</b></h2>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-2">
                  {/* insert */}
                  <a type="button" className="btn btn-warning" data-toggle="modal" data-target="#insertModal" data-whatever="@getbootstrap" onClick={handleAddStaff}><i className="material-icons"></i> Add Staff</a>
                </div>
                {_renderListStaff()}
              </div>
            </div>
          </div>
        </div>
        {_renderPopUpInsert()}
        {_renderModalUpdate()}
        {_renderDelete()}
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
          totalItemsCount={listStaff?.length}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
        />
      </div>
    </main>

    <ToastContainer />
  </div>
}
export default Table;