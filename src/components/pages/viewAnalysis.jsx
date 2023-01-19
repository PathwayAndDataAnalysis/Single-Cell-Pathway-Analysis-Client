import NavBar from "../navBar";
import {DropDownLayoutCompact} from "../other/dropDownLayoutCompact";
import {InputLayoutCompact} from "../other/inputLayoutCompact";
import {ActionButton} from "../buttons/actionButton";
import {useLocation} from "react-router-dom";
import {ScatterPlotNew} from "../other/scatterPlotNew";
import {ColorPaletteDropDown} from "../other/colorPaletteDropDown";

export function ViewAnalysis(props) {

    const {state} = useLocation();

    return (<div>
        <div>
            <NavBar/>
        </div>

        <div className='container mx-auto'>
            <div className="grid grid-cols-6 gap-2 my-4">
                <div className="h-screen col-span-5 bg-gray-50 rounded-md">
                    <ScatterPlotNew analysisName={state}/>

                </div>

                <div className="h-screen col-span-1 bg-gray-100 rounded-md py-8">
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

                        <ColorPaletteDropDown label="Select Color Palette"
                                              options={["Color1", "Color2", "Color3"]}/>


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
                </div>
            </div>
        </div>

    </div>)
}