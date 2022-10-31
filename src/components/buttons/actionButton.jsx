export function ActionButton(props) {
    return (
        <button
            type={props.type}
            className='bg-gray-500 hover:bg-gray-700 text-white text-xs font-medium py-1 px-3 rounded-md h-8 ml-6 mt-6'
            onClick={props.onClick}>
            {props.text}
        </button>
    );
}
