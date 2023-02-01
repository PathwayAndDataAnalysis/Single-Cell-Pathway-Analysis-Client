import {ActionButton} from "../../buttons/actionButton";

export function AddNewGeneLayout(props) {
    return (
        <div className="justify-end m-4 items-center">
            <label className='font-semibold text-sm text-gray-600 pb-1 block'>
                Enter Gene Names...
            </label>

            <textarea
                placeholder={"Genes"}
                rows={4}
                className="h-36 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                onInput={props.onChange}/>

            <ActionButton text="Fetch" onClick={props.onSubmit}/>
        </div>
    );
}