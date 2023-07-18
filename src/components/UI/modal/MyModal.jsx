import React from 'react';
import popup from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [popup.myModal]

    /* если окно видимо, добавлять класс active */
    if(visible) {
        rootClasses.push(popup.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={popup.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;