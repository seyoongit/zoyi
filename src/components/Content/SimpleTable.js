import React, { Component } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { DataStateActions } from "store/actionCreators";
import { throttle } from "lodash";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit,
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    },
    head: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(0,0,0,0.3)"
        },
    },
    deleteButton: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(255,0,0,0.3)"
        },

    }
});

class SimpleTable extends Component {
    state = {
        sortColumn: "",
        isAscending: null,
    }
    onClickHeadFactory(sortColumn) {
        return (e) => { this.setState({ sortColumn, isAscending: !this.state.isAscending }); }
    }
    getSortedData(data, sortColumn, isAscending) {
        if (sortColumn === "") return data

        return JSON.parse(JSON.stringify(data)).sort((aRow,bRow) => {
            let a = aRow[sortColumn]
            let b = bRow[sortColumn]
            if (a.length===0) return 1
            if (b.length===0) return -1

            if (a instanceof Array || b instanceof Array) {
                const compareA = a instanceof Array ? Number(a[0]) : a;
                const compareB = b instanceof Array ? Number(b[0]) : b;
                return ( compareA > compareB ? 1 : -1)*(isAscending ? 1 : -1)
            }
            if (typeof a==="number" || typeof b==="number") {
                return  isAscending ? a-b : b-a
            }
            else if (typeof a==="string" || typeof b==="string") {
                return (a>b ? 1 : -1)*(isAscending ? 1 : -1)
            }
        })
    }
    handleScroll = () => {
        const { displayMoreData, dataState, pushMessage } = this.props;
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
            
        const distFromBottom = scrollHeight - innerHeight - scrollTop
        if (distFromBottom < 10) {
            if (dataState.howmanyDisplay === dataState.data.length) pushMessage("더 가져올 데이터가 없습니다.") 
            else displayMoreData(20)
        }
    }
    componentDidMount() {
        this.handleScrollThrottled = throttle(this.handleScroll, 200);
        window.addEventListener("scroll", this.handleScrollThrottled);
    }   
    componentWillUnmount() {
        this.handleScrollThrottled.cancel();
        window.removeEventListener("scroll", this.handleScroll);
    }
    onClickDeleteFactory(id) {
        return () => {DataStateActions.deleteData(id)}
    }
    render() {
        const { classes, dataState, query } = this.props;
        const { sortColumn, isAscending } = this.state;
        const data = this.getSortedData(dataState.data.slice(0, dataState.howmanyDisplay), sortColumn, isAscending )
        .filter(row => {
            if (query === "") return true
            for (let col in row) {
                if (typeof row[col] === "string" && row[col].toUpperCase().includes(query.toUpperCase())) return true
            }
            return false
        })
        data.forEach(row => {
            for (let col in row) {
                if (row[col] instanceof Array) row[col] = row[col].join()
            }
        })

        return (
            <Paper className={classes.root} onScroll={this.handleScroll}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {data.length > 0
                                ? Object.keys(data[0]).map(col => (
                                    <TableCell
                                    key={col}
                                    className={classes.head} 
                                    onClick={this.onClickHeadFactory(col)}
                                    align="center">
                                        {col}
                                    </TableCell>
                                ))
                                : <td>There is no data to display</td>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.id}>
                                {Object.keys(row).map(col => (
                                    <TableCell key={row.id+col} align="center">
                                        {row[col]}
                                    </TableCell>
                                ))}
                                <TableCell
                                className={classes.deleteButton}
                                onClick={this.onClickDeleteFactory(row.id)}>
                                    X
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(SimpleTable);