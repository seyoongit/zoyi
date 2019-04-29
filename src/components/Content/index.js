import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import SimpleTable from "./SimpleTable";
import CreateTemplate from "./CreateTemplate";
import { DataStateActions, ModalActions } from "store/actionCreators";

class Content extends Component {
    componentDidMount() {
        const url = "https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes";
        DataStateActions.fetchData(url);
    }
    render() {
        const { dataState, search } = this.props;
        const len = dataState.data.length;
        const schema = len > 0 
            ? Object.keys(dataState.data[len-1]).reduce((schemaObject, col) => {
                const value = dataState.data[len-1][col]
                schemaObject[col] = value instanceof Array ? "array" : typeof value // `number` or `string` or `array`    
                return schemaObject
            }, {}) 
            : {}
        
        return (
            <Grid
            container 
            style={{paddingBottom: 150}} >
                <Grid item xs />
                <Grid item xs={10}>
                    <CreateTemplate
                    schema={schema}
                    createNewData={DataStateActions.createNewData}
                    pushMessage={ModalActions.pushMessage}/>
                    <SimpleTable
                    dataState={dataState}
                    query={search.query}
                    displayMoreData={DataStateActions.displayMoreData}
                    pushMessage={ModalActions.pushMessage} />
                </Grid>
                <Grid item xs />
            </Grid>
        );
    }
}

const mapStateToProps = ({ dataState, search }) => ({
    dataState,
    search
});

export default connect(
    mapStateToProps,
    () => ({})
)(Content);
