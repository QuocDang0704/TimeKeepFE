import MenuStaff from './MenuStaff';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from "react";
const Checkin = () => {
    const [idStaff, setIdStaff] = useState('');
    const [isCheckin, setIsCheckin] = useState(false);
    const [isCheckout, setCheckout] = useState(false);
    const [isChecked, setIsChecked] = useState();
    useEffect(() => {
        const idStaffSess = sessionStorage.getItem('idStaff');
        if (idStaffSess.trim() === '' || idStaffSess === undefined || idStaffSess === null) {
            window.location = '/';
            return;
        }
        setIdStaff(idStaffSess);
        const dateNow = new Date();
        const day = dateNow.getDate();
        const month = dateNow.getMonth() + 1;
        const param = {
            day: day,
            idStaff: Number(idStaffSess),
            month: month
          }
        axios.post(`http://localhost:8080/apiTimeKeeps/timekeep/test`, param).then(resp => {
            if (resp?.status === 204) {
                setIsChecked(false);
            }
            if (resp?.status === 200) {
                if (resp?.data?.startTimeApproved === null) {
                    setIsChecked(false);
                    return;
                }
                if (resp?.data?.stopTimeApproved === null) {
                    setIsCheckin(true);
                    setIsChecked(true);
                } else {
                    setIsCheckin(true);
                    setCheckout(true);
                }
            }
        })
    }, []);
    const handleCheckinOrout = (event) => {
        const { checked } = event.target;
        setIsChecked(checked);
        if (checked) {
            const paramCheckin = {
                idStaff: idStaff,
                status: true
            }
            axios.post(`http://localhost:8080/apiTimeKeeps/checkin-checkout`, paramCheckin).then(resp => {
                if (resp?.status === 200) {
                    toast.success('Check in success');
                    setIsCheckin(true);
                }
            }).catch(err => toast.error('Check in failse'))
        } else {
            const paramCheckout = {
                idStaff: idStaff,
                status: false
            }
            if (isCheckin) {
                axios.post(`http://localhost:8080/apiTimeKeeps/checkin-checkout`, paramCheckout).then(resp => {
                    if (resp?.status === 200) {
                        setIsCheckin(true);
                        toast.success('Check out success');
                        setCheckout(true);
                    }
                }).catch(err => toast.error('Check in failse'))
            }
            
        }
    }
    return <div>
        <MenuStaff />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4 checkin">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <div className="col-sm-6">
                                        <h2>Checkin or checkout</h2>
                                    </div>
                                </div>
                                {!isCheckin && !isCheckout && <h3>Please check in!</h3>}
                                {isCheckin && !isCheckout && <h5>Checked in!</h5>}
                                {isCheckin && isCheckout && <h5>Checked out!</h5>} 
                            </div>
                            <input checked={isChecked} disabled={isCheckin && isCheckout} onClick={handleCheckinOrout} className="checkbox_checkin" type="checkbox" value="" />
                        </div>
                    </div>
                </div>
            </div>
        </main >

        <ToastContainer />
    </div >
}
export default Checkin;