import {Checkbox} from "@material-tailwind/react";
import {useState} from "react";

export function FilterInputLayout(props) {

    const [isChecked, setIsChecked] = useState(true);

    return (
        <div id={props.id} className='flex flex-row my-4 items-center mx-12'>
            <Checkbox
                id={props.id}
                className=""
                value={props.booleanValue}
                defaultChecked
                onChange={(event) => {
                    setIsChecked(!isChecked);
                }}
            />

            {props.label_before}

            {
                isChecked ?
                    <input type="text"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500
                            focus:border-blue-500 block w-20 px-2.5 py-1 mx-4"
                           required
                           value={"100"}
                           onChange={props.onChange}
                    />
                    :
                    <input type="text"
                           disabled={true}
                           className="bg-gray-50 border border-red-300 text-gray-900 text-md rounded-md focus:ring-blue-500
                            focus:border-blue-500 block w-20 px-2.5 py-1 mx-4"
                           required
                           value={10}
                    />
            }


            {props.label_after}
        </div>
    );
}