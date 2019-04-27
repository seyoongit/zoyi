import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import SimpleTable from "./SimpleTable";
import CreateForm from "./CreateForm";
import { DataStateActions, ModalActions } from "store/actionCreators";

// 새로운 데이터를 추가하고 난뒤 CreateForm의 state를 다시 초기화 하거나 아니면  CrateForm 자체를 리렌더링해서 초기화 해줘야 하는데
// 여기서는 CreateForm에 key로 준값을 +1 해서 다시 리렌더링 하는 방식을 선택했습니다.
let __key_to_rerender_form__ = 0 

class Content extends Component {
    componentDidMount() {
        const { fetchData } = this.props; 
        DataStateActions.fetchData("https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes");
    }
    render() {
        const { dataState, search } = this.props;
        const schema = dataState.data.length > 0 
            ? Object.keys(dataState.data[0]).reduce((schemaObject, col) => {
                const value = dataState.data[0][col]
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
                    <CreateForm
                    schema={schema}
                    createNewData={newRow => { DataStateActions.createNewData(newRow); __key_to_rerender_form__+=1; }}
                    key={__key_to_rerender_form__}
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
