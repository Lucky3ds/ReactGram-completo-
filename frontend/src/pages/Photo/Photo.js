import './Photo.css';

import { uploads } from '../../utils/config';

//components
import Message from '../../Components/Message';
import { Link } from 'react-router-dom';
import PhotoItem from '../../Components/PhotoItem';

//hooks
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useResetMessage } from '../../hooks/useResetMessage';
//Redux
import { getPhoto,like,comment } from '../../slices/photoSlice';
import LikeContainer from '../../Components/LikeContainer';

const Photo = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {photo, loading, error, message} = useSelector(
        (state) => state.photo
    )
    const resetMessage = useResetMessage();
    //comentários
        const [commentText, setCommentText]  = useState("")
    //loading photo data
    useEffect(()=>{
        dispatch(getPhoto(id));
    },[dispatch,id])

    //insert a Like
    const handleLike = () =>{
        dispatch(like(photo._id))
        resetMessage()
    };
    //Insert a comment
    const handleComment = (e) =>{
        e.preventDefault()
            const commentData={
                comment:commentText,
                id:photo._id
            }

            dispatch(comment(commentData)) 
            setCommentText("")
            resetMessage()
           
    }
   
    if(loading){
       return <p>Loading...</p>
    }

  return <div id="photo">
        <PhotoItem  photo={photo} />
        <LikeContainer photo={photo} user={user} handleLike={handleLike} />

        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}

        <div className='comments'>
          {photo.comments &&(
                 <>
                 <h3>Comentários ({photo.comments.length}):</h3>
                 <form onSubmit={handleComment}>
                   <input
                     type="text"
                     placeholder="Insira seu comentário..."
                     onChange={(e) => setCommentText(e.target.value)}
                     value={commentText || ""}
                   />
                   <input type="submit" value="Enviar" />
                 </form>
                 {photo.comments.length === 0 && <p>Não há comentários...</p>}
                 {photo.comments.map((comment) => (
                   <div className="comment" key={comment.comment}>
                     <div className="author">
                       {comment.userImage && (
                         <img
                           src={`${uploads}/users/${comment.userImage}`}
                           alt={comment.userName}
                         />
                       )}
                       <Link to={`/users/${comment.userId}`}>
                         <p>{comment.userName}</p>
                       </Link>
                     </div>
                     <p>{comment.comment}</p>
                   </div>
                 ))}
               </>
          )}
        </div>
    </div>
  
}

export default Photo