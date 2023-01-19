import NavBar from "../navBar";
import {DropDownLayoutCompact} from "../other/dropDownLayoutCompact";
import {InputLayoutCompact} from "../other/inputLayoutCompact";
import {ActionButton} from "../buttons/actionButton";
import {useLocation} from "react-router-dom";
import {ScatterPlotNew} from "../other/scatterPlotNew";
import {ColorPaletteDropDown} from "../other/colorPaletteDropDown";
import {useEffect, useState} from "react";
import {getDataWithMetaDataColumnsHandler, getMetadataColumnsHandler} from "../api/apiHandlers";

function PlotSidePanel({analysisName, onColumnChange}) {

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


export function ViewAnalysis(props) {
    const {state} = useLocation();

    const [clusterChanged, setClusterChanged] = useState(0);

    const onMetaColumnChange = (analysisName, metaColumn) => {
        if (metaColumn === "Meta Data Column") return;

        getDataWithMetaDataColumnsHandler(analysisName, metaColumn)
            .then(res => {
                console.log("New data", res.data);
                setClusterChanged(clusterChanged + 1);
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (<div>
        <div>
            <NavBar/>
        </div>

        <div className='container mx-auto'>
            <div className="grid grid-cols-6 gap-2 my-4">
                <div className="h-screen col-span-5 bg-gray-50 rounded-md">
                    <ScatterPlotNew analysisName={state}
                                    isChanged={clusterChanged}
                    />

                </div>
                <div>
                    <PlotSidePanel
                        analysisName={state}
                        onColumnChange={onMetaColumnChange}
                    />
                </div>
            </div>
        </div>

    </div>)
}