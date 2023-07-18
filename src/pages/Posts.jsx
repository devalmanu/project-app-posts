import React, {useEffect, useRef, useState} from 'react';
/* import './../styles/App.css'; */
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    /* за логику изменения алгоритма сортировки отвечает компонент [filter, setFilter] */
    const [filter, setFilter] = useState({sort: '', query: ''});
    /* состояние которое отвечает видимо модальное окно или нет */
    const [modal, setModal] = useState(false);
    /* состояние с общим количеством страниц*/
    const [totalPages, setTotalPages] = useState(0);
    /* лимит для страницы для пагинации*/
    const [limit, setLimit] = useState(10);
    /* номер текущей страницы */
    const [page, setPage] = useState(1);
    /* фильтрация и сортировка постов hooks*/
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    /* элемент последний в списке, отслеживаемый в области видимости*/
    /* при его появлении в видимости подгружаем порцию постов*/
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        /* в бесконечной ленте данные нужно помещать в конец страницы*/
        /* создаем новый массив: добавляем посты, которые уже есть и в конец добавляем то, что вернул сервер*/
        setPosts([...posts, ...response.data]);
        /* достаем общее количество постов, их 100  */
        const totalCount = response.headers['x-total-count']
        /* количество постов и лимит передаем параментами в функцию */
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        /* колбэк в котором изменяем номер страницы */
        setPage(page + 1);
    })

    /* в хук useEffect (принимает callback, deps-массив зависимостей)
    deps будет пустым, чтобы отработало единожды
    при первичной отрисовке подгрузить список постов*/
    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    /* создание поста */
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    /* получаем пост из дочернего компонента*/
    /* удаление поста*/
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    /*  функция изменения номера страницы с подгрузкой списка постов к ней */
    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton className="creatPost" onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            {/*Модальное окно с формой для создания поста*/}
            <MyModal visible={modal} setVisible={setModal}>
                {/*Форма для создания поста*/}
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            {/*Фильтр постов*/}
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {/*селект для выбора показа количества постов*/}
            <MySelect style={{marginTop: 15}}
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            ></MySelect>
            {postError &&
                <h2 className="postsResult">Произошла ошибка {postError}</h2>
            }

            {/* если длина массива постов не равна 0, то будем отрисовывать список постов */}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты о программировании" />
            {/* отслеживаемый элемент видимости */}
            <div ref={lastElement} style={{height: 10, background: 'transparent'}}/>
            {/* бесконечная подгрузка постов */}
            {isPostsLoading &&
                /* до загрузки контента показываем прелоадер */
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
