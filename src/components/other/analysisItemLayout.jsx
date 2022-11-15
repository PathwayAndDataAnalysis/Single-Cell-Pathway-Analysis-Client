export function AnalysisItemLayout(props) {

    return (
        <div key={props.keyValue} className="flex justify-between items-left hover:bg-gray-300 rounded-md p-2">

            <div className="w-3/5m items-left justify-left justify-center items-center">
                <p className="justify-left text-md">{props.analysisName}</p>
            </div>


            <div className="w-2/5 flex justify-between justify-center items-center">

                <button type='button'
                        className='bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                        onClick={props.onViewClick}>
                    View
                </button>

                <button type='button'
                        className='bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                        onClick={props.onEditClick}>
                    Edit
                </button>

                <button type='button'
                        className='bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                        onClick={props.onDeleteClick}>
                    Delete
                </button>

            </div>

        </div>
    )
}