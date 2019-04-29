import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { Create as CreateIcon } from "@material-ui/icons";
import CreateForm from "./CreateForm" ;

class CreateTemplate extends Component {
    state = {
        open: false,
    }
    postProcessNewData(row) {
        const { schema } = this.props;
        for (let col in row) {
            row[col] = schema[col] === "number"
                ? Number(row[col])
                : row[col]
            row[col] = schema[col] === "array" 
                ? row[col].split(/ +/)
                : row[col]
            row[col] = schema[col] === "string"
                ? row[col].trim()
                : row[col]
        }
    }
    handleSubmit = (newRow) => {
        this.postProcessNewData(newRow);
        this.props.createNewData(newRow);
        this.props.pushMessage("새로운 데이터 추가 완료.");
        this.setState({ open: !this.state.open});
    }
    render() {
        const { schema } = this.props;
        const { open } = this.state;
        return (
            <>
                <Fab
                color="primary"
                style={{marginTop: 8}}
                onClick={() => this.setState({ open: !open }) }>
                    <CreateIcon></CreateIcon>
                </Fab>

                {open && <CreateForm onSubmit={this.handleSubmit} schema={schema}/>}
            </> 
        );
    }
}

export default CreateTemplate;