import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal, Snackbar, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ModalActions } from "store/actionCreators";

const styles = theme => ({
    modal: {
        display: "flex", 
        "justify-content": "center",
        "align-items": "center",
    } 
});

class ModalPage extends Component {
    render() {
        const { classes, children, modal } = this.props;
        return (
            <>
                <Modal
                open={modal.loading}
                className={classes.modal}>
                    <CircularProgress color="secondary" />
                </Modal>

                <Snackbar
                open={modal.message !== ""}
                onClose={() => {ModalActions.modalReset()}}
                message={modal.message}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={2000}/>
            </>
        );
    }
}

const mapStateToProps = ({ modal }) => ({
    modal
});

export default connect(
    mapStateToProps,
    () => ({})
)(withStyles(styles)(ModalPage));