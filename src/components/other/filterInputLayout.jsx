import {Checkbox} from "@material-tailwind/react";

export function FilterInputLayout(props) {
    return (
        <div id={props.id} className='flex flex-row my-4 items-center mx-12'>
            <Checkbox
                id={props.id}
                checked={props.checkBoxValue}
                onChange={props.onCheckChange}
            />
            {props.label_before}
            {
                props.checkBoxValue ?
                    <input type="text"
                           className="bg-gray-50 border border-gray-300 border-2 text-gray-900 text-md rounded-md focus:ring-blue-500
                            focus:border-blue-500 block w-20 px-2.5 py-1 mx-4"
                           required
                           value={props.value}
                           onChange={props.onValueChange}
                    />
                    :
                    <input type="text"
                           disabled={true}
                           className="bg-red-50 border border-red-300 border-2 text-gray-900 text-md rounded-md focus:ring-blue-500
                            focus:border-blue-500 block w-20 px-2.5 py-1 mx-4"
                           required
                           value={""}
                    />
            }
            {props.label_after}
        </div>
    );
}