import "./Search.css"

//hooks
import { useEffect } from "react"
import {useSelector, useDispatch} from "react-redux"
import {useResetMessage} from "../../hooks/useResetMessage"
import { useQuery } from "../../hooks/useQuery"
//components
import LikeContainer from "../../Components/LikeContainer"
import PhotoItem from "../../Components/PhotoItem"
import { Link } from "react-router-dom"
import { searchPhotos } from "../../slices/photoSlice"

//Redux
import { like } from '../../slices/photoSlice'


const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch()

  const resetMessage = useResetMessage(dispatch)

  const {user} = useSelector(state  => state.auth)

  const {photos, loading} = useSelector(state => state.photo)

  //Load photos / exibir photo...

  useEffect(()=>{
    dispatch(searchPhotos(search))
  },[dispatch,search])

  //Like a photo
  const handleLike = (photo) =>{
    dispatch(like(photo._id))
    resetMessage()  
};
  if(loading){
    return <p>Carregando...</p>
  }


  return <div id="search">
    <h2>Você está buscando por:{search}</h2>
         {Array.isArray(photos) ? photos.map((photo)=>(
            <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
         )): null} 
          {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram encontrados os resultados da pesquisa...
        </h2>
      )}
      </div>
  
}

export default Search