import React, { Component } from 'react';
import {
    Fab,
    TextField,
    Input,
    Zoom,
} from "@material-ui/core";
import { Create } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit
    },
    submit: {
        "&:hover": {
            background: "rgba(0,250,0,0.3)"
        }
    }
})

class CreateForm extends Component {
    state = {
        open: false,
        newRow: {}
    }
    onChangeFactory = col => event => {
        const { schema } = this.props;
        let value = schema[col] === "number"
            ? Number(event.target.value)
            : event.target.value
        value = schema[col] === "array" 
            ? value.split(/ +/)
            : value
        value = schema[col] === "string"
            ? value.trim()
            : value
            
        const newRow = Object.assign({}, {...this.state.newRow, [col]: value})
        this.setState({ newRow });
    }
    isValidate() {
        const { schema } = this.props;
        for(let col in schema) {
            const value = this.state.newRow[col]
            if (value === undefined) return false
            if (schema[col] === "number" && isNaN(value)) return false
        }
        return true
    }
    onSubmit = (event) => {
        event.preventDefault()
        const { createNewData, pushMessage } = this.props;
        
        if (!this.isValidate()) return pushMessage("잘못된 입력값입니다. 입력값을 확인해주세요.")
        createNewData(this.state.newRow)
    }
    render() {
        const { classes, schema } = this.props;
        const { open } = this.state;
        const textFields = Object.keys(schema).map(col => 
            <TextField
            key={col}
            label={col} 
            onChange={this.onChangeFactory(col)} 
            fullWidth
            helperText={schema[col]==="array" ? "이 필드는 Array 타입입니다. 두개 이상의 입력값들은 띄어쓰기로 구분하세요." : null}/>
        )
        return (
            <>
                <Fab
                className={classes.button}
                color="primary"
                onClick={() => this.setState({ open: !this.state.open }) }>
                    <Create></Create>
                </Fab>
                {this.state.open && 
                    <Zoom in={open}>
                        <form onSubmit={this.onSubmit}>
                            {textFields}
                            <Input type="submit" className={classes.submit} fullWidth />
                        </form>
                    </Zoom>
                } 
            </>
        );
    }
}

export default withStyles(styles)(CreateForm);