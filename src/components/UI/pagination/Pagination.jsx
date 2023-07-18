import React from 'react';
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
    /* вызов функции расчета пагинации*/
    let pagesArray = getPagesArray(totalPages);

    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                <span
                    /* смена страницы списка постов по клику*/
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? "page__link page__current" : "page__link"}
                >
                    {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;