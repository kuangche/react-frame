import { LocaleProvider, DatePicker } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import  React  from 'react';
import PropTypes from 'prop-types'
moment.locale('zh-cn');

const TestComponent = ( { change} ) => {
    return (
        <LocaleProvider locale={zhCN}>
            <div style={{ width: 400, margin: '100px auto' }}>
                <DatePicker onChange={ change } />
            </div>
        </LocaleProvider>
    )
}

TestComponent.propTypes = {
    change: PropTypes.func.isRequired,
}

export default TestComponent
/*
export default class TestComponent extends Component{
    constructor(props){
        super(props);
    }

    handleChange = (date) => {
        this.props.change(date);
    }
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <div style={{ width: 400, margin: '100px auto' }}>
                    <DatePicker onChange={this.handleChange} />
                </div>
            </LocaleProvider>
        );
    }
}*/
