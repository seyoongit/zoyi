import React, { Component } from "react";
import { debounce } from "lodash";
import { 
    AppBar,
    Toolbar, 
    Typography, 
    InputBase,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import { SearchActions } from "store/actionCreators";

const styles = theme => ({
    root: {
        width: "100%"
    },
    grow: {
        flexGrow: 1
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing.unit,
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit",
        width: "100%"
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: 120,
            "&:focus": {
                width: 200
            }
        }
    }
});

class TopNav extends Component {
    constructor(props) {
        super(props)
        this.changeQueryDebounced = debounce(SearchActions.changeQuery, 500)
    }
    componentWillUnmount() {
        this.changeQueryDebounced.cancel()
    }
    onChange = (e) => {
        this.changeQueryDebounced(e.target.value.trim())
    }
    onBlur = (e) => {
        this.changeQueryDebounced("");
        e.target.value = "";
    }
    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                        className={classes.title}
                        variant="h4"
                        color="inherit"
                        noWrap>
                            ZOYI
                        </Typography>

                        <div className={classes.grow} />
                        
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                            <SearchIcon />
                            </div>
                            <InputBase
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }} />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(TopNav);
