import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    /* состояние, вернет пост по id*/
    const [post, setPost] = useState({});
    /* состояние полученного комментария */
    const [comments, setComments] = useState([]);
    /* асинхронная функция возвращает пост, индикатор загрузки, ошибка */
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getByID(id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })
    /* на первую отрисовку компонента будем получать данные с сервера*/
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div className="single-post__page">
            <span className="post-header__descript">страница поста {params.id}</span>
            {/*индикация загрузки постов*/}
            {isLoading
                ? <Loader/>
                :  <div className="post-header"><h1>{post.title}</h1></div>
            }
           <div className="post-comment">
               <h2>
                   Комментарии
               </h2>
               {isComLoading
                   ? <Loader/>
                   : <div className="post-comment__body">
                       {comments.map(comm =>
                           <div key={comm.id} style={{marginTop: 15}}>
                               <h5>{comm.email}</h5>
                               <div>{comm.body}</div>
                           </div>
                       )}
                   </div>
               }
           </div>

        </div>
    );
};

export default PostIdPage;