import {useEffect, useState} from "react";
import {getMetadataColumnsHandler} from "../../api/apiHandlers";
import {DropDownLayoutCompact} from "../../other/dropDownLayoutCompact";
import {InputLayoutCompact} from "../../other/inputLayoutCompact";
import {ColorPaletteDropDown} from "../../other/colorPaletteDropDown";
import {ActionButton} from "../../buttons/actionButton";
// import {PrimaryButton} from "../../buttons/primaryButton";

export function PlotSidePanel({analysisName, onColumnChange, onNewGeneEnter}) {

    const [metadataColumns, setMetadataColumns] = useState([]);

    const getMetaDataColumns = () => {
        getMetadataColumnsHandler(analysisName)
            .then(res => {
                setMetadataColumns(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getMetaDataColumns(analysisName);
    }, [analysisName]);


    return (<div className="h-screen col-span-1 bg-gray-100 rounded-md py-8">
        <div>
            <DropDownLayoutCompact label="Select trajectory"
                                   options={["1", "2", "3"]}/>

            <InputLayoutCompact inputFor="Select source cell"
                                placeholder="Source cell"
                                onChange={() => {
                                }}
            />

            <InputLayoutCompact inputFor="Select target cell"
                                placeholder="Target cell"
                                onChange={() => {
                                }}
            />

            <InputLayoutCompact inputFor="Name of the trajectory"
                                placeholder="Trajectory name"
                                onChange={() => {
                                }}
            />

            <DropDownLayoutCompact label="Optimize distance"
                                   options={["Squared euclidean", "Mean square error"]}/>

            <p>.</p>

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

            <AddNewGeneLayout />

            <ColorPaletteDropDown label="Select Meta Column"
                                  options={["Meta Data Column", ...metadataColumns]}
                                  onChange={(event) => {
                                      onColumnChange(analysisName, event.target.value);
                                  }}
            />


            <div className="">
                <ActionButton text="Calculate trajectory"
                              onClick={() => {
                              }}
                              type="button"
                />
                <ActionButton text="Save trajectory"
                              onClick={() => {
                              }}
                              type="button"
                />
            </div>

        </div>
    </div>);
}
