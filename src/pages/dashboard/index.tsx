import React, {useContext} from "react";
import BasePageContainer from "../../components/base-page-container";
import {AuthContext} from "../../contexts/auth-context";

const DashboardPage: React.FC = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <BasePageContainer>
            <div className="flex flex-col justify-center min-h-svh">
                <div className="card">
                    <h1 className="h1">
                        Welcome, {currentUser.firstName}
                    </h1>
                </div>
            </div>
        </BasePageContainer>
    )
}

export default DashboardPage;