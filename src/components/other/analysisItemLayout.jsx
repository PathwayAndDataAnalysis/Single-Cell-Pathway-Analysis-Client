export function AnalysisItemLayout(props) {

    return (
        <div key={props.keyValue} className="flex justify-between items-left hover:bg-gray-300 rounded-md p-2">

            <p className="justify-left text-md">{props.analysisName}</p>

        </div>
    )
}