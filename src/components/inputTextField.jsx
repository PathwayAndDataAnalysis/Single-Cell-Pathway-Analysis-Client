export function InputTextField(props) {
    return (
        <div>
            <input
                type={props.type}
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
            />
        </div>
    );
}