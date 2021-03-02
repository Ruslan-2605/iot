import React, { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActivePage, getPaginationInfo } from "../../../redux/selectors/projectsSelector";
import { getUserToken, getUserName } from "../../../redux/selectors/authSelector";
import { getPaginationInfoThunkCreator, setPageActionCreator } from "../../../redux/reducers/projectsReducer";
import * as queryString from "query-string";

export const Pagination = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const paginationInfo = useSelector(getPaginationInfo);
    const username = useSelector(getUserName);
    const token = useSelector(getUserToken);
    const page = useSelector(getActivePage);
    const countPage = paginationInfo.pages;

    const pages = [];
    for (let i = 1; i <= countPage; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(countPage / 5);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionNumber = (portionNumber - 1) * 5 + 1;
    const rightPortionNumber = 5 * portionNumber;

    useEffect(() => {
        dispatch(getPaginationInfoThunkCreator(username, token))
    }, [])

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

    const onPageChanged = (page) => {
        dispatch(setPageActionCreator(page))
    }

    return (
        <div className={styles.paginator}>

            {portionNumber > 1 ?
                <button onClick={() => setPortionNumber(portionNumber - 1)}><ArrowBackIcon /></button>
                :
                <button disabled><ArrowBackIcon /></button>
            }

            {pages
                .filter((page) => page >= leftPortionNumber && page <= rightPortionNumber)
                .map((page) => {
                    return (
                        <button key={page.toString()} onClick={() => onPageChanged(page)}
                        >{page}</button>
                    );
                })}

            {portionNumber < portionCount ?
                <button onClick={() => setPortionNumber(portionNumber + 1)}><ArrowForwardIcon /></button>
                :
                <button disabled><ArrowForwardIcon /></button>
            }

        </div>
    );
};
