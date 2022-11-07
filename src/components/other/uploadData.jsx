export function UploadData(props) {
    return (
        <div className='panel flex mb-8'>
            <h1 className='text-l pt-1'>Upload Files</h1>

            <div className='justify-left items-left'>
                <input type='file'
                       id='file'
                       name='file'
                       className='bg-gray-500 hover:bg-gray-500 text-white text-xs py-1 px-6 w-400 rounded-md ml-6'
                       // multiple={true}
                       onChange={props.onFileChange}/>

                <button type='button'
                        className='bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                        onClick={props.onUploadClick}
                >
                    Upload File
                </button>
            </div>
        </div>
    );
}