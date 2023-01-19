import {IconButton, Popover, PopoverContent, PopoverHandler,} from "@material-tailwind/react";

export function AnalysisItemLayout({
                                       keyValue,
                                       analysisName,
                                       onViewClick,
                                       onEditClick,
                                       onDeleteClick,
                                       isFilteringDone,
                                       isPCADone,
                                       isUMAPDone,
                                       isAnalysisReady,
                                       errorMessage
                                   }) {

    return (<>
        <div key={keyValue} className="flex justify-between items-left hover:bg-gray-300 rounded-md px-6 py-2">

            <div className="w-3/5m flex items-left justify-left justify-center items-center">
                <p className="justify-left text-md">{analysisName}</p>
            </div>


            <div className="w-2/5 flex justify-between justify-center items-center">

                <div className="flex justify-end mr-2 w-10">
                    {
                        isAnalysisReady === -1 ? // Analysis Failed to Run
                            <Popover>
                                <PopoverHandler>
                                    <IconButton variant="text" size={'lg'}
                                                onClick={() => {
                                                    console.log('on progress clicked');
                                                }
                                                }>
                                        <i className="fas fa-duotone fa-circle-exclamation text-red-500 fa-lg"></i>
                                    </IconButton>
                                </PopoverHandler>
                                <PopoverContent>
                                    <>
                                        {isFilteringDone === -1 ?
                                            <> Filtering Process: <i className="fas fa-circle-exclamation text-red-500"></i>
                                            </>
                                            : null}
                                    </>
                                    <>
                                        {isPCADone === -1 ?
                                            <>
                                                Running PCA: <i className="fas fa-circle-exclamation text-red-500"></i>
                                            </>
                                            :
                                            null}
                                    </>
                                    <>
                                        {isUMAPDone === -1 ?
                                            <>
                                                Running UMAP: <i className="fas fa-circle-exclamation text-red-500"></i>
                                            </>
                                            :
                                            null}
                                    </>
                                    <br/>
                                    <>
                                        Error Message: {errorMessage}
                                    </>
                                </PopoverContent>
                            </Popover>
                            :
                            isAnalysisReady === 1 ? // Analysis success and Ready to view
                                <Popover>
                                    <PopoverHandler>
                                        <IconButton variant="text" size={'lg'}
                                                    onClick={() => {
                                                        console.log('done button clicked');
                                                    }}
                                        >
                                            <i className="fas fa-solid fa-circle-check text-green-500 fa-lg"></i>
                                        </IconButton>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        Analysis is ready to view. Click on "View" button to see your result.
                                    </PopoverContent>
                                </Popover>
                                :
                                // Analysis Running
                                <Popover>
                                    <PopoverHandler>
                                        <IconButton variant="text" size={'lg'}
                                                    onClick={() => {
                                                        console.log('on progress clicked');
                                                    }}>
                                            <i className="fas fa-solid fa-spinner text-gray-600 fa-lg"></i>
                                        </IconButton>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <>
                                            Filtering Process: {isFilteringDone === 1 ?
                                            <i className="fas fa-circle-check text-green-500"></i>
                                            :
                                            <i className="fas fa-spinner text-gray-500"></i>} <br/>
                                        </>
                                        <>
                                            Running PCA : {isPCADone === 1 ?
                                            <i className="fas fa-circle-check text-green-500"></i>
                                            :
                                            <i className="fas fa-spinner text-gray-500"></i>} <br/>
                                        </>
                                        <>
                                            Running UMAP: {isUMAPDone === 1 ?
                                            <i className="fas fa-circle-check text-green-500"></i>
                                            :
                                            <i className="fas fa-spinner text-gray-500"></i>} <br/>
                                        </>
                                        <>
                                            Is Analysis Ready: {isAnalysisReady === 1 ?
                                            <i className="fas fa-circle-check text-green-500"></i>
                                            :
                                            <i className="fas fa-spinner text-gray-500"></i>} <br/>
                                        </>
                                    </PopoverContent>
                                </Popover>








                        // isAnalysisReady?
                        //
                        //     <Popover>
                        //         <PopoverHandler>
                        //             <IconButton variant="text" size={'lg'}
                        //                         onClick={() => {
                        //                             console.log('done button clicked');
                        //                         }
                        //                         }
                        //             >
                        //                 <i className="fas fa-check-double text-green-500 fa-lg"></i>
                        //             </IconButton>
                        //         </PopoverHandler>
                        //         <PopoverContent>
                        //             Analysis is ready to view. Click on "View" button to see your result.
                        //         </PopoverContent>
                        //     </Popover>
                        //     :
                        //
                        //     <Popover>
                        //         <PopoverHandler>
                        //             <IconButton variant="text" size={'lg'}
                        //                         onClick={() => {
                        //                             console.log('on progress clicked');
                        //                         }
                        //                         }>
                        //                 <i className="fas fa-refresh text-gray-500 fa-lg"></i>
                        //             </IconButton>
                        //         </PopoverHandler>
                        //         <PopoverContent>
                        //             <>
                        //                 Filtering Process: {isFilteringDone ?
                        //                 <i className="fas fa-check-double text-green-500"></i> :
                        //                 <i className="fas fa-spinner text-gray-500"></i>} <br/>
                        //             </>
                        //             <>
                        //                 Running PCA : {isPCADone ?
                        //                 <i className="fas fa-check-double text-green-500"></i> :
                        //                 <i className="fas fa-spinner text-gray-500"></i>} <br/>
                        //             </>
                        //             <>
                        //                 Running UMAP: {isUMAPDone ?
                        //                 <i className="fas fa-check-double text-green-500"></i> :
                        //                 <i className="fas fa-spinner text-gray-500"></i>} <br/>
                        //             </>
                        //             <>
                        //                 Is Analysis Ready: {isAnalysisReady ?
                        //                 <i className="fas fa-check-double text-green-500"></i> :
                        //                 <i className="fas fa-spinner text-gray-500"></i>} <br/>
                        //             </>
                        //             <>
                        //                 Error Message: {errorMessage}
                        //             </>
                        //         </PopoverContent>
                        //     </Popover>

                    }
                </div>


                {
                    isAnalysisReady === 1 ?
                        <button type='button'
                                className='bg-green-500 hover:bg-green-700 text-white font-medium text-xs py-1 px-3 h-8 rounded-md ml-6'
                                onClick={onViewClick}>
                            View
                        </button>
                        :
                        <button type='button'
                                className='bg-gray-500 hover:bg-gray-500 text-white text-xs font-medium py-1 px-3 h-8 rounded-md ml-6'>
                            View
                        </button>
                }

                {/*{*/}
                {/*    isAnalysisReady === 1 ?*/}
                <button type='button'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-medium text-xs py-1 px-3 h-8 rounded-md ml-6'
                        onClick={onEditClick}>
                    Edit
                </button>
                {/*:*/}
                {/*        <button type='button'*/}
                {/*                className='bg-gray-500 hover:bg-gray-500 text-white font-medium text-xs py-1 px-3 h-8 rounded-md ml-6'>*/}
                {/*            Edit*/}
                {/*        </button>*/}
                {/*}*/}


                <button type='button'
                        className='bg-red-500 hover:bg-red-700 text-white font-medium text-xs py-1 px-3 h-8 rounded-md ml-6'
                        onClick={onDeleteClick}>
                    Delete
                </button>


            </div>
        </div>


    </>)
}