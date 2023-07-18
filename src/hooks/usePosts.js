import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    /* перед поиском нужно сделать фильтрацию и удалять ненужный элементы из массива*/
    const sortedPosts = useMemo(() => {
        /* сортировка постов*/
        if(sort) {
            return  [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)
    /* поиск постов*/
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}