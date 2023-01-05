import {Checkbox} from "@material-tailwind/react";

export function CheckBoxLayout(props) {

    return (
        <div id={props.id} className='flex flex-row my-4 items-center mx-12'>
            <Checkbox
                id={props.id}
                className=""
                defaultChecked
                onChange={props.onChange}
            />
            {props.label}
        </div>
    );
}