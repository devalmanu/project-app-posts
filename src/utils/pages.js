export const getPageCount = (totalCount, limit) => {
    return Math.ceil( totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    /* массив на основании которого формируется пагинация, при нажатии на кнопку формируется страница */
    let result = [];
    for(let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result;
}