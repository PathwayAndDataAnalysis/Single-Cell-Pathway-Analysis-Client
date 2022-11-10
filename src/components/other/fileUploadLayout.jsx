export function FileUploadLayout(props) {
    return (
        <div className='flex flex-row justify-left m-4 items-center'>

            <label className='w-1/6 font-semibold text-sm text-gray-600 pb-1 block'>{props.labelName}</label>


            <div className=''>
                <input type='file'
                       id='file'
                       name='file'
                       className='bg-gray-500 hover:bg-gray-500 text-white text-xs py-1 px-6 w-400 rounded-md'
                       onChange={props.onFileChange}/>

                <button type='button'
                        className='bg-gray-500 hover:bg-gray-700 text-white text-xs py-1 px-3 h-8 rounded-md ml-6'
                        onClick={props.onUploadClick}
                >
                    Upload File
                </button>

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