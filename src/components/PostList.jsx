import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
    {/*условная отрисовка: если нет постов или все удалены*/}
    {/*если длина массива постов равна 0, то будем показывать уведомление*/}
    if(!posts.length) {
        return (
            <h2 className="postsResult">Посты не найдены!</h2>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                        <CSSTransition
                            key={post.id}

                            timeout={500}
                            classNames="post"
                        >
                            <PostItem remove={remove} number={index +1} post={post} />
                        </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;