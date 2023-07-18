import {useState} from "react";

/* хук предоставляет часто используемый функционал: обработку индикации загрузки и обработку ошибки запроса на получение данных
* при этом он возвращает массив, состоящий из 3 элементов, и этими элементами можно управлять внутри любого компонента*/
export const useFetching = (callback) => {
    /* состояние отвечает за загрузку*/
    const [isLoading, setIsLoading] = useState(false);
    /* обработка ошибок, по умолчанию пустая строка */
    const [error, setError] = useState('');

    /* если ошибка загрузки произошла, то будет помещать текст этой ошибки */
    const fetching = async (...args) => {
        try {
            /* показываем прелоадер*/
            setIsLoading(true)
            /* вызываем коллбэк принятый аргументом*/
            await callback(...args)
        } catch(e) {
            /* сообщение ошибки*/
            setError(e.message);
        } finally {
            /* убираем прелоадер*/
            setIsLoading(false)
        }
    }

    /* возвращаем функцию, возвращаем состояние, возвращаем ошибку*/
    return [fetching, isLoading, error]
}