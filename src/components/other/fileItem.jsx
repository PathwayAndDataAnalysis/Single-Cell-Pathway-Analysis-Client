export function FileItem(props) {

    return (
        <div className="flex justify-between items-left hover:bg-gray-300 p-2">
            <h3 key={props.key} className="w-3/4m justify-left">{props.fileName}</h3>

            <div className="w-1/4 flex justify-between">
                <div className="flex justify-end">
                    <h4>{props.fileSize}</h4>
                </div>
                <div className="flex justify-end">
                    <h4>{props.fileDate}</h4>
                </div>
                <button type='button'
                        className='bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                        onClick={props.onDeleteClick}
                >
                    Delete
                </button>
            </div>


        </div>
    )
}