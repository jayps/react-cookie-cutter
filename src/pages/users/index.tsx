import React, {useContext} from "react";
import BasePageContainer from "../../components/base-page-container";
import AuthenticatedPageContainer from "../../components/authenticated-page-container";
import {AuthContext} from "../../store/auth/auth-context";

const UsersPage: React.FC = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <AuthenticatedPageContainer>
            <div className="card">
                <h1 className="h1">
                    Users
                </h1>
            </div>
        </AuthenticatedPageContainer>
    )
}

export default UsersPage;