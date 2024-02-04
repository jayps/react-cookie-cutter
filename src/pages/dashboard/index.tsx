import React, {useContext} from "react";
import BasePageContainer from "../../components/base-page-container";
import {AuthContext} from "../../contexts/auth-context";
import AuthenticatedPageContainer from "../../components/authenticated-page-container";

const DashboardPage: React.FC = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <AuthenticatedPageContainer>
            <div className="card">
                <h1 className="h1">
                    Welcome, {currentUser?.firstName}
                </h1>
            </div>
        </AuthenticatedPageContainer>
    )
}

export default DashboardPage;