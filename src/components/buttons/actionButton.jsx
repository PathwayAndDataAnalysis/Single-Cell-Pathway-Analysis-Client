export function ActionButton(props) {
    return (
        <button
            type={props.type}
            className='bg-green-500 hover:bg-green-700 text-white text-xs font-medium rounded-md m-2 p-2'
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}
