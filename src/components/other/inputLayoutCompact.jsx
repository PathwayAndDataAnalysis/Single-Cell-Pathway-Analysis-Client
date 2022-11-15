export function InputLayoutCompact(props) {
    return (
        <div className='justify-end m-4 items-center'>

            <label className='font-semibold text-sm text-gray-600 pb-1 block'>
                {props.inputFor}
            </label>

            <input type="text"
                   id={props.inputId}
                   className="h-8 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                   placeholder={props.placeholder}
                   onChange={props.onChange}
                   value={props.value}
                   required>
            </input>
        </div>
    );
}