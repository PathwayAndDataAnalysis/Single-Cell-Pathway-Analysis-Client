import {IconButton, Popover, PopoverContent, PopoverHandler,} from "@material-tailwind/react";

export function AnalysisItemLayout(props) {

    return (<>
        <div key={props.keyValue} className="flex justify-between items-left hover:bg-gray-300 rounded-md px-6 py-2">

            <div className="w-3/5m flex items-left justify-left justify-center items-center">
                <p className="justify-left text-md">{props.analysisName}</p>
            </div>


            <div className="w-2/5 flex justify-between justify-center items-center">

                <div className="flex justify-end mr-2 w-10">
                    {
                        props.isAnalysisReady ?

                            <Popover>
                                <PopoverHandler>
                                    <IconButton variant="text" size={'lg'}
                                                onClick={() => {
                                                    console.log('done button clicked');
                                                }
                                                }
                                    >
                                        <i className="fas fa-check-double text-green-500 fa-lg"></i>
                                    </IconButton>
                                </PopoverHandler>
                                <PopoverContent>
                                    Analysis is ready to view. Click on "View" button to see your result.
                                </PopoverContent>
                            </Popover>
                            :
                            <Popover>
                                <PopoverHandler>
                                    <IconButton variant="text" size={'lg'}
                                                onClick={() => {
                                                    console.log('on progress clicked');
                                                }
                                                }>
                                        <i className="fas fa-refresh text-gray-500 fa-lg"></i>
                                    </IconButton>
                                </PopoverHandler>
                                <PopoverContent>
                                    <>
                                        Filtering Process: {props.isFilteringDone ?
                                        <i className="fas fa-check-double text-green-500"></i> :
                                        <i className="fas fa-spinner text-gray-500"></i>} <br/>
                                    </>
                                    <>
                                        Running PCA : {props.isPCADone ?
                                        <i className="fas fa-check-double text-green-500"></i> :
                                        <i className="fas fa-spinner text-gray-500"></i>} <br/>
                                    </>
                                    <>
                                        Running UMAP: {props.isUMAPDone ?
                                        <i className="fas fa-check-double text-green-500"></i> :
                                        <i className="fas fa-spinner text-gray-500"></i>} <br/>
                                    </>
                                    <>
                                        Is Analysis Ready: {props.isAnalysisReady ?
                                        <i className="fas fa-check-double text-green-500"></i> :
                                        <i className="fas fa-spinner text-gray-500"></i>} <br/>
                                    </>
                                </PopoverContent>
                            </Popover>

                    }
                </div>


                {props.isAnalysisReady ? <button type='button'
                                                 className='bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                                                 onClick={props.onViewClick}>
                        View
                    </button>
                    :
                    <button type='button'
                            className='bg-gray-500 hover:bg-gray-500 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'>
                        View
                    </button>
                }

                {
                    props.isAnalysisReady ?
                        <button type='button'
                                className='bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                                onClick={props.onEditClick}>
                            Edit
                        </button>
                        :
                        <button type='button'
                                className='bg-gray-500 hover:bg-gray-500 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'>
                            Edit
                        </button>
                }

                {
                    props.isAnalysisReady ?
                        <button type='button'
                                className='bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                                onClick={props.onDeleteClick}>
                            Delete
                        </button>
                        :
                        <button type='button'
                                className='bg-gray-500 hover:bg-gray-500 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'>
                            Delete
                        </button>
                }

            </div>
        </div>


    </>)
}