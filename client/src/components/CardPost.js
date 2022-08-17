import React from "react";
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../redux/features/postSlice";

const CardPost = ({imageFile, description, title, _id, name, likes}) => {
const {user} = useSelector((state) => ({...state.auth}));
const userId = user?.result?._id;

const dispatch = useDispatch();
const excerpt = (str) => {
    if(str.length > 45) {
        str = str.substring(0, 45) + "..."
    }
    return str;
};

const Likes = () => {
    if(likes.length > 0) {
        return likes.find((like) => like === userId) ? (
            <>
            <MDBIcon fas icon="thumbs-up"/>
            &nbsp;
            {likes.length > 2 ? (
                <MDBTooltip tag="a" title={`Vous et ${likes.length - 1} d'autre personnes`}>
                    {likes.length} Likes
                </MDBTooltip>
            ) : (
                `${likes.length} Like${likes.length > 1 ? 's' : ""}` 
            )}
            </>
        ) : (
            <>
            <MDBIcon far icon="thumbs-up"/>
            &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
            </>
        )
    }
    return(
        <>
        <MDBIcon far icon="thumbs-up"/>
        &nbsp;Like
        </>
    );
};
    const handleLike = () => {
        dispatch(likePost({_id}));
    };
    return (
        <MDBCardGroup style={{
            alignContent: "center",
            justifyContent: "center"
        }}>
            <MDBCard className="h-100 mt-2 d-sm-flex" style={{maxWidth: "28rem"}}>
                <MDBCardImage
                src={imageFile}
                alt={title}
                position='top'
                style={{maxWidth: "100%", height: "250px"}} />
                    <div className="top-left">{name}</div>
                    <MDBBtn style={{justifyContent: "flex-end"}} tag="a" color="none" onClick={!user?.result ? null : handleLike}>
                        {!user?.result ? (
                            <MDBTooltip title="Connectez vous pour ajouter un like" tag="a">
                                <Likes />
                            </MDBTooltip>
                                ) : (
                                    <Likes />
                                )}
                    </MDBBtn>
                    <MDBCardBody>
                        <MDBCardTitle className="text-start">{title}</MDBCardTitle>
                        <MDBCardText className="text-start">{excerpt(description)}
                        <Link to={`/post/${_id}`}>
                            Voir plus
                        </Link>
                        </MDBCardText>
                    </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    )
};

export default CardPost;