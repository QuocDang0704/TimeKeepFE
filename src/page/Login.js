import GoogleLogin from 'react-google-login';
import axios from 'axios';
const Login = () => {
    const responseGoogle = (response) => {
        console.log(5, response);
        signup(response);
    }
    const signup = (res) => {
        const googleresponse = {
            email: res?.profileObj?.email,
            image: res?.profileObj?.imageUrl,
        };
        axios.post(`http://localhost:8080/api/login/socialmediaData`, googleresponse).then(resp => {
            if (resp?.status === 200) {
                const positionId = resp?.data?.idPosition ? resp?.data?.idPosition : '';
                const idStaff = resp?.data?.id ? resp?.data?.id : '';
                sessionStorage.setItem('positionId', positionId);
                sessionStorage.setItem('idStaff', idStaff);
                if (positionId !== '' && Number(positionId) === 1) {
                    window.location = '/staffs';
                }
                if (positionId !== '' && Number(positionId) !== 1) {
                    window.location = '/checkin';
                }
            }
        }).catch(err => console.log('Error login'));
    }
    return <>
        <div className="container position-sticky z-index-sticky top-0"></div>
        <main className="main-content  mt-0">
            <div
                className="page-header align-items-start min-vh-100"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")'
                }}
            >
                <span className="mask bg-gradient-dark opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <GoogleLogin
                                clientId="565208819330-p70njlfon7agg8kjihndurfj0viur4ps.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle} ></GoogleLogin>
                        </div>
                    </div>
                </div>
                <footer className="footer position-absolute bottom-2 py-2 w-100">
                    <div className="container">
                        <div className="row align-items-center justify-content-lg-between">
                            <div className="col-12 col-md-6 my-auto">
                                <div className="copyright text-center text-sm text-white text-lg-start">
                                    © , made with <i className="fa fa-heart" aria-hidden="true" />{" "}
                                    by
                                    <a
                                        href="https://www.facebook.com/groups/fpolyhnudpm"
                                        className="font-weight-bold text-white"
                                        target="_blank"
                                    >
                                        Group UDPM
                                    </a>
                                    from fpoly
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                    <li className="nav-item">
                                        <a
                                            href="https://www.facebook.com/BaoQuoc0407/"
                                            className="nav-link text-white"
                                            target="_blank"
                                        >
                                            Contact
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/278123025_1181435939264352_7209296967492930663_n.jpg?stp=dst-jpg_s320x320&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=U-oUYaAHP44AX9RkSes&_nc_ht=scontent.fhan2-3.fna&oh=00_AT-Y0w1E9S2Xh-UCGvhTMxMjpfhjk3IdZSApWFDuheV2Ag&oe=625448E6"
                                            className="nav-link text-white"
                                            target="_blank"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="https://quocdang0704.github.io/"
                                            className="nav-link text-white"
                                            target="_blank"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    </>
}
export default Login;