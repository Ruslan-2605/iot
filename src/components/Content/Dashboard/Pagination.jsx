import React, { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActivePage, getCountPage } from "../../../redux/selectors/projectSelector";
import { getUserToken, getUserName } from "../../../redux/selectors/authSelector";
import { getCountPageThunkCreator, setPageActionCreator } from "../../../redux/reducers/projectReducer";
import * as queryString from "query-string";

export const Pagination = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const countPage = useSelector(getCountPage);
    const username = useSelector(getUserName);
    const token = useSelector(getUserToken);
    const page = useSelector(getActivePage)

    const pages = [];
    for (let i = 1; i <= countPage; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(countPage / 5);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionNumber = (portionNumber - 1) * 5 + 1;
    const rightPortionNumber = 5 * portionNumber;

    useEffect(() => {
        dispatch(getCountPageThunkCreator(username, token))
    }, [])// ОБЩЕЕ КОЛВО ПРОЕКТОВ 

    useEffect(() => {

        const parsed = queryString.parse(history.location.search);

        let actualPage = page;

        if (!!parsed.page) actualPage = Number(parsed.page)

        dispatch(setPageActionCreator(actualPage))

    }, [])

    useEffect(() => {

        const query = {};

        if (page !== 1) query.page = String(page);

        history.push({
            pathname: "/dashboard",
            search: queryString.stringify(query)
        })
    }, [page])

    const onPageChanged = (p) => {
        dispatch(setPageActionCreator(p))
    }

    return (
        <div className={styles.paginator}>

            {portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}><ArrowBackIcon /></button>
            }

            {pages
                .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) => {
                    return (
                        <button key={p.toString()} onClick={() => onPageChanged(p)}
                        >{p}</button>
                    );
                })}

            {portionNumber < portionCount &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}><ArrowForwardIcon /></button>
            }

        </div>
    );
};
