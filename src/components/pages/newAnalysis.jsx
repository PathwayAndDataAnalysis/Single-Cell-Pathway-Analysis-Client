import NavBar from "../navBar";
import {InputLayout} from "../other/inputLayout";
import {ActionButton} from "../buttons/actionButton";
import {DropDownLayout} from "../other/dropDownLayout";
import {getAllFilesHandler, runAnalysisHandler} from "../api/apiHandlers";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";


export function NewAnalysis(props) {

    const dimReductionTypes = ["Use PCA", "Use Existing PCA File"];
    const umapTypesArray = ["Use UMAP", "Use Existing UMAP File"];

    const location = useLocation();


    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [newAnalysisName, setNewAnalysisName] = useState("");
    const [selectedDataMatrixFile, setSelectedDataMatrixFile] = useState("");
    const [selectedMetaDataFile, setSelectedMetaDataFile] = useState("");
    const [usePCA, setUsePCA] = useState(true);
    const [pcaCount, setPcaCount] = useState('');
    const [selectedPCAFile, setSelectedPCAFile] = useState('');
    const [useUMAP, setUseUMAP] = useState(true);
    const [selectedUMAPFile, setSelectedUMAPFile] = useState('');
    const [n_neighbors, setN_neighbors] = useState('');
    const [min_dist, setMin_dist] = useState('');
    const [metric, setMetric] = useState('euclidean');

    useEffect(() => {
        getAllFiles();

        if (location.state === null) {
            console.log("No state");
        } else {
            console.log("State exists");
            console.log(location.state);
            setNewAnalysisName(location.state.analysisName);
            setSelectedDataMatrixFile(location.state.dataMatrixFile);
            setSelectedMetaDataFile(location.state.metaDataFile);

            if (location.state.usePCA) {
                setUsePCA(true);
                setPcaCount(location.state.pcaCount);
            } else {
                setUsePCA(false);
                setSelectedPCAFile(location.state.pcaFile);
            }

            if (location.state.useUMAP) {
                setUseUMAP(true);
                setN_neighbors(location.state.n_neighbors);
                setMin_dist(location.state.min_dist);
                setMetric(location.state.metric);
            } else {
                setUseUMAP(false);
                setSelectedUMAPFile(location.state.umapFile);
            }
        }

    }, [location.state]);


    function getAllFiles() {
        getAllFilesHandler()
            .then(res => {
                let temp = [];
                for (let i = 0; i < res.data['files'].length; i++)
                    temp.push(res.data['files'][i]['fileName']);
                setUploadedFiles(temp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function onUMAPParametersChange(event) {
        if (event.target.id === "n_neighbors")
            setN_neighbors(event.target.value);
        else if (event.target.id === "min_dist")
            setMin_dist(event.target.value);
        else if (event.target.id === "metric")
            setMetric(event.target.value);
    }

    function onRunAnalysisClick() {
        let analysisParams = {
            "analysisName": newAnalysisName,
            "dataMatrixFile": selectedDataMatrixFile,
            "metaDataFile": selectedMetaDataFile,
            "usePCA": usePCA,
            "pcaCount": pcaCount,
            "pcaFile": selectedPCAFile,
            "useUMAP": useUMAP,
            "umapFile": selectedUMAPFile,
            "n_neighbors": n_neighbors,
            "min_dist": min_dist,
            "metric": metric,
        }

        runAnalysisHandler(analysisParams)
            .then(res => {
                console.log(res);
                window.location.href = "/home";
            })
            .catch(err => {
                console.log(err);
            });
    }

    function onUpdateAnalysisClick() {

    }

    return (<div>
            <div>
                <NavBar/>
            </div>

            <div className='container mx-auto'>
                <h1 className='text-left text-xl mt-4 mb-2'>Setup Analysis:</h1>
                <div
                    className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                    <InputLayout inputFor="Name of the analysis:"
                                 inputId="analysis_name"
                                 placeholder="New Analysis..."
                                 value={newAnalysisName}
                                 onChange={(event) => {
                                     setNewAnalysisName(event.target.value);
                                 }}

                    />
                </div>


                <h1 className='text-left text-xl mt-4 mb-2'>Data:</h1>
                <div
                    className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                    <DropDownLayout label="Data matrix:"
                                    id="data_matrix"
                                    options={["Select Data Matrix File", ...uploadedFiles]}
                                    value={selectedDataMatrixFile}
                                    onChange={(event) => {
                                        setSelectedDataMatrixFile(event.target.value);
                                    }}
                    />

                    <DropDownLayout label="Metadata:"
                                    id="meta_data"
                                    options={["Select Meta Data File", ...uploadedFiles]}
                                    value={selectedMetaDataFile}
                                    onChange={(event) => {
                                        setSelectedMetaDataFile(event.target.value);
                                    }}
                    />
                </div>


                <h1 className='text-left text-xl mt-4 mb-2'>Dimension reduction:</h1>
                <div
                    className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                    <DropDownLayout label="Select one:"
                                    id="pca_dr"
                                    options={dimReductionTypes}
                                    value={usePCA ? dimReductionTypes[0] : dimReductionTypes[1]}
                                    onChange={(event) => {
                                        setUsePCA(event.target.value === "Use PCA");
                                    }}
                    />
                    {
                        usePCA ?
                            <InputLayout inputFor="Number of comp:"
                                         inputId="no_of_comp"
                                         placeholder=""
                                         value={pcaCount}
                                         onChange={(event) => {
                                             setPcaCount(event.target.value);
                                         }}
                            />
                            :
                            <div>
                                <DropDownLayout label="Select PCA File:"
                                                id="pca_file"
                                                options={["Select Existing PCA File", ...uploadedFiles]}
                                                value={selectedPCAFile}
                                                onChange={(event) => {
                                                    setSelectedPCAFile(event.target.value);
                                                }}
                                />

                            </div>
                    }

                </div>


                <h1 className='text-left text-xl mt-4 mb-2'>2D projection:</h1>
                <div
                    className='my-4 grid-cols-1 block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>

                    <DropDownLayout
                        label="Method:"
                        id="method"
                        options={umapTypesArray}
                        value={useUMAP ? umapTypesArray[0] : umapTypesArray[1]}
                        onChange={(event) => {
                            setUseUMAP(event.target.value === "Use UMAP");
                        }}
                    />
                    {
                        useUMAP ?
                            <div>
                                <InputLayout
                                    inputFor="n_neighbors:"
                                    inputId="n_neighbors"
                                    placeholder="15"
                                    value={n_neighbors}
                                    onChange={onUMAPParametersChange}
                                />
                                <InputLayout
                                    inputFor="min_dist:"
                                    inputId="min_dist"
                                    placeholder="0.1"
                                    value={min_dist}
                                    onChange={(event) => {
                                        setMin_dist(event.target.value);
                                    }}
                                />
                                <DropDownLayout
                                    label="metric:"
                                    id="metric"
                                    options={["euclidean", "no euclidean"]}
                                    value={metric}
                                    onChange={onUMAPParametersChange}
                                />
                            </div>
                            :
                            <div>
                                <DropDownLayout label="UMAP File:"
                                                id="umap_file"
                                                options={["Select UMAP File", ...uploadedFiles]}
                                                value={selectedUMAPFile}
                                                onChange={(event) => {
                                                    setSelectedUMAPFile(event.target.value);
                                                }}
                                />
                            </div>
                    }
                </div>


                <div className='flex flex-row justify-end mt-6'>
                    {
                        location.state === null ?
                            <ActionButton type="button"
                                          text='Run Analysis'
                                          onClick={onRunAnalysisClick}
                            />
                            :
                            <ActionButton type="button"
                                          text='Update Analysis Parameters'
                                          onClick={onUpdateAnalysisClick}
                            />
                    }

                    <ActionButton type="button" text='Cancel' onClick={() => {
                        window.location = '/home'
                    }}/>
                </div>

            </div>

            {/* Bottom spacing */}
            <div className='h-12'></div>

        </div>
    );
}
