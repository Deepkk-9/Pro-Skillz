import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import AuthStackU from '../../routes/Other/AuthStackU';
import AuthSatckSP from '../../routes/Other/AuthStackSP';
import UserProviderScreen from './UserProviderScreen';

const UserProviderOpt = () => {

    const { authType, updateAuthState } = useContext(AuthContext);

    // authType - true = User
    // authType - false = Provider

    if (authType == null) {
        return (
            <UserProviderScreen />
        )
    }
    else if (authType) {
        return (
            <AuthStackU />
        )
    }
    else if (!authType) {
        return (
            <AuthSatckSP />
        )
    }

}

export default UserProviderOpt