import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  action from '../../model/actions';
import './index.scss'
class ReduxDemo extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        loginUserName: PropTypes.string,
        loginError: PropTypes.string
    };

    componentDidMount() {
        this.props.login('欢迎使用React+Redux+Router 脚手架');
    }

    render() {

        if (this.props.isLoading) {
            return (<p> loading... </p>);
        }
        if (this.props.loginUserName) {
            return (<p className="home">{this.props.loginUserName}</p>)
        }
        if (this.props.loginError) {
            return (<p>{this.props.loginError}</p>)
        }
        return null;
    }
}

const mapStateToProps = (state, ownProps) => ({
    isLoading: state.loginPageData.loading,
    loginUserName: state.entities.loginUser,
    loginError: state.loginPageData.error && state.loginPageData.error.toString()
});

//const mapDispatchToProps = {
//    login
//};

export default connect(mapStateToProps, action)(ReduxDemo);