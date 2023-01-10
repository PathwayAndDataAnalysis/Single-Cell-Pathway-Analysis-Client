export function UploadData(props) {
    return (
        <div className='panel flex mb-8'>
            <h1 className='text-l pt-1'>Upload Files</h1>

            <div className='justify-left items-left'>
                <input type='file'
                       id='file'
                       name='file'
                       accept={'.csv, .tsv'}
                       className='bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-6 w-400 rounded-md ml-6'
                       onChange={props.onFileChange}/>
                {
                    props.isFileSelected ?
                        <button type='button'
                                className='bg-green-400 hover:bg-green-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                                onClick={props.onUploadClick}
                        >
                            Upload File
                        </button>
                        :
                        <button type='button'
                                disabled={true}
                                className='bg-gray-500 hover:bg-gray-500 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                        >
                            Upload File
                        </button>
                }


            </div>

            {
                props.uploadPercentage > 0 ?
                    props.uploadPercentage === 100 ?
                        <p className='ml-10 text-xs'>File upload completed</p>
                        :
                        <p className='ml-10 text-xs'>{props.uploadPercentage} % file uploaded.</p>
                    :
                    <div/>
            }

        </div>
    );
}