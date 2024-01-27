import React, {PropsWithChildren} from "react";

const BasePageContainer: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="bg-gray-100 min-h-svh text-gray-800 w-full p-4">
            {children}
        </div>
    )
}

export default BasePageContainer;