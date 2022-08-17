import React, {useState, useEffect} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import FileBase from "react-file-base64";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost } from '../redux/features/postSlice';

const initialState = {
    title: "",
    description: ""
};

const AddEditPost = () => {
    const [postData, setPostData] = useState(initialState);
    const {error, loading, userPosts} = useSelector((state) => ({...state.post}));
    const { user } = useSelector((state) => ({...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {title, description} = postData;
    const {id} = useParams();

    useEffect(() => {
        if(id) {
            const SinglePost = userPosts.find((post) => post._id === id);
            setPostData({...SinglePost});
        }
    }, [id])


    useEffect(() => {
        error && toast.error(error);
    }, [error]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && description) {
            const updatedPostData = {...postData, name: user?.result?.name};

            if(!id) {
                dispatch(createPost({updatedPostData, navigate, toast }));
            } else {
                dispatch(updatePost({id, updatedPostData, toast, navigate}));
            }
        }
    };

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setPostData({...postData, [name]: value});
    };

  return (
    <div style={{
        margin: "auto", 
        padding: "15px",
        maxWidth: "450px", 
        alignContent: "center", 
        marginTop: "120px"

    }} className='container'>
        <MDBCard alignment='center'>
            <h5>{id ? "Modifier Poste" : "Ajouter un Poste"}</h5>
            <MDBCardBody>                
            <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3" >
                <div className="col-md-12">
                    <MDBInput placeholder="Entrer un Titre" type="text" value={title} name="title" onChange={onInputChange} className='form-control' required invalid validation="Entrer un Titre" />
                </div>
                <div className="col-md-12">
                    <MDBInput placeholder="Entrer une description" type="text" value={description} name="description" onChange={onInputChange} className='form-control' required invalid textarea rows={4} validation="Entrez une description" />
                </div>

               {/* Image upload */}

                <div className="d-flex justify-content-start">
                    <FileBase type="file" multiple={false} onDone={(({base64}) => setPostData({...postData, imageFile: base64}))}/>
                </div>
                <div className="col-12">
                    <MDBBtn style={{width: "100%"}}>{id ? "Modifier" : "Ajouter"}</MDBBtn>
                </div>
            </MDBValidation>
           </MDBCardBody>
        </MDBCard>
    </div>
  )
};

export default AddEditPost;