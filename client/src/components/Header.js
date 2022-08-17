import React, {useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import {useSelector, useDispatch} from "react-redux";
import {setLogout} from "../redux/features/authSlice";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(setLogout());
    }
    const{user} = useSelector((state) => ({...state.auth}));
  return (
    <MDBNavbar fixed="top" expand="lg" style={{backgroundColor: "#f0e6ea"}}>
        <MDBContainer>
            <MDBNavbarBrand href="/" style={{color: "#606080", fontWeight: "600", fontSize: "22px"}}>
                Groupomania
            </MDBNavbarBrand>
            <MDBNavbarToggler type="button" aria-expanded="false" aria-label="Toogle navigation" onClick={() => setShow(!show)}
            style={{color: "#606080"}}>
            <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
                <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lgs-0">
                    {user?.result?._id && (
                        <h5 style={{marginRight: "30px", marginTop:"27px"}}>Connecté en tant que : {user?.result?.name}</h5>
                    )}
                    <MDBNavbarItem>
                        <MDBNavbarLink href="/">
                            <p className="header-text">Accueil</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    {user?.result?._id && (
                        <>
                        <MDBNavbarItem>
                        <MDBNavbarLink href="/addPost">
                            <p className="header-text">Ajouter un post</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink href="/profile">
                            <p className="header-text">Profile</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                        </>
                    )}
                    {user?.result?._id ? (
                         <MDBNavbarItem>
                         <MDBNavbarLink href="/login">
                             <p className="header-text" onClick={handleLogout}>Logout</p>
                         </MDBNavbarLink>
                     </MDBNavbarItem>
                    ) : (
                        <MDBNavbarItem>
                        <MDBNavbarLink href="/login">
                            <p className="header-text">Login</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    )}
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
  )
};

export default Header;