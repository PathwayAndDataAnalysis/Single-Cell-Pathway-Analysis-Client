import {InputLayoutCompact} from "../../other/inputLayoutCompact";
import {ActionButton} from "../../buttons/actionButton";

export function AddNewGeneLayout(props){
    return(
          <div className="flex flex-row">

                <InputLayoutCompact inputFor="Name of the gene"
                                    placeholder="Gene"
                                    onChange={(event) => {
                                        onNewGeneEnter(event.target.value)
                                    }}
                />
                <ActionButton type="button"
                              text="Add"
                             />
            </div>
    );
}