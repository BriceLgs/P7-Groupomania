import React, {useState, useEffect} from 'react'
import {
    MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner
} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import { register } from '../redux/features/authSlice';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const Register = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({...state.auth}))
    const {email, password, firstName, lastName, confirmPassword} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            return toast.error("Mot de passe non identique");
        }
        // Passage à la prochaine page
        
        if(email && password && firstName && lastName && confirmPassword) {
            dispatch(register({formValue, navigate, toast}));
        };
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };
    return (
    <div 
        style={{
        margin: "auto", 
        padding: "15px", 
        maxWidth: "450px", 
        alignContent: "center", 
        marginTop: "120px"
        }}
    >
        <MDBCard alignment='center'>
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Inscription</h5>
        <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className="col-md-6">
                    <MDBInput 
                    label="First Name" 
                    type="text" 
                    value={firstName}
                    name="firstName" 
                    onChange={onInputChange} 
                    required 
                    invalid 
                    validation="Entrer votre prénom" />
                </div>
                <div className="col-md-6">
                    <MDBInput 
                    label="Last Name" 
                    type="text" 
                    value={lastName}
                    name="lastName" 
                    onChange={onInputChange} 
                    required 
                    invalid 
                    validation="Entrer votre nom de famille" />
                </div>
                <div className="col-md-12">
                    <MDBInput 
                    label="email" 
                    type="email" 
                    value={email}
                    name="email" 
                    onChange={onInputChange} 
                    required 
                    invalid 
                    validation="Entrer votre email" />
                </div>
                <div className="col-md-12">
                    <MDBInput 
                    label="password" 
                    type="password" 
                    value={password}
                    name="password" 
                    onChange={onInputChange} 
                    required 
                    invalid 
                    validation="Entrer votre mot de passe" />
                </div>
                <div className="col-md-12">
                    <MDBInput 
                    label="password confirm" 
                    type="password" 
                    value={confirmPassword}
                    name="confirmPassword" 
                    onChange={onInputChange} 
                    required 
                    invalid 
                    validation="Entrer à nouveau votre mot de passe" />
                </div>
                <div className="col-12">
                    <MDBBtn style={{width: "100%"}} className="mt-2">
                        {loading && (
                            <MDBSpinner 
                            size="sm" role="status"
                            tag="span"
                            className="me-2" />
                        )}
                        S'inscrire
                    </MDBBtn>
                </div>
            </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
            <Link to="/login">
            <p>Déjà un compte ? Se connecter</p>
            </Link>
        </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Register;