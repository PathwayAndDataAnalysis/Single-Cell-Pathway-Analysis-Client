export function ColorPaletteDropDown(props) {
    return (
        <div className='justify-left m-4 items-left'>
            <label className='justify-left font-semibold text-sm text-gray-600 pb-1 block'>
                {props.label}
            </label>
            <select id={props.id}
                    className='h-8 block w-full px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full'
                    onChange={props.onChange}>
                >
                {
                    props.options.map((option) => {
                            return <option value={option}>{option}</option>
                        }
                    )
                }
            </select>
        </div>
    );
}