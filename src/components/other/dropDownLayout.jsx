export function DropDownLayout(props) {
    return (<div className='flex flex-row justify-end m-4 items-center'>
        <label className='w-1/6 font-semibold text-sm text-gray-600 pb-1 block'>
            {props.label}
        </label>
        <select id={props.id}
                className='w-5/6 block w-full p-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full'
                onChange={props.onChange}>
            >
            {props.options.map((option) => {
                if (option === props.value) return (
                    <option key={option.value} value={option.value} selected>{option}</option>)

                return (<option key={option.value} value={option.value}>{option}</option>)
            })}
        </select>


        {/*<span className="group relative">*/}
        {/*    <span*/}
        {/*        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0*/}
        {/*        transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black*/}
        {/*        before:content-[''] group-hover:opacity-100">*/}
        {/*    Your info here*/}
        {/*</span>*/}
        {/*     info*/}
        {/*</span>*/}

    </div>);
}