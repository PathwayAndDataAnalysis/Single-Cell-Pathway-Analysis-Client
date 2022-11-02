
export function UploadData(props) {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-left text-xl my-2'>Upload Data:</h1>

            <div className='flex flex-col justify-center items-center'>
                <input type='file' id='file' name='file'
                       className='bg-gray-500 hover:bg-gray-700 text-white text-xs font-medium py-1 px-3 rounded-md h-8 ml-6 mt-2'
                       onChange={props.onFileChange}/>

                <button type='button'
                        className='bg-gray-500 hover:bg-gray-700 text-white text-xs font-medium py-1 px-3 rounded-md h-8 ml-6 mt-6'
                        onClick={props.onUploadClick}
                >
                    Upload File
                </button>
            </div>
        </div>
    );
}