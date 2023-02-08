import NavBar from "../../navBar";
import {useLocation} from "react-router-dom";
import {ScatterPlot} from "./scatterPlot";
import {useState} from "react";
import {
    getDataUsingGenesHandler,
    getDataWithGeneExpressionColumnsHandler,
    getDataWithMetaDataColumnsHandler
} from "../../api/apiHandlers";
import {PlotSidePanel} from "./plotSidePanel";


export function ViewAnalysis(props) {
    const {state} = useLocation();

    const [clusterChanged, setClusterChanged] = useState(0);
    const [enteredGeneList, setEnteredGeneList] = useState([]);

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

    const onGeneExpressionColumnChange = (analysisName, geneExpressionColumn) => {
        if (geneExpressionColumn === "Gene Expression Column") return;

        getDataWithGeneExpressionColumnsHandler(analysisName, geneExpressionColumn)
            .then(res => {
                console.log("New data", res.data);
                setClusterChanged(clusterChanged + 1);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const onNewGeneEnter = (geneName) => {
        if (geneName === "") {
            setEnteredGeneList([]);
            return;
        }
        setEnteredGeneList((geneName.trim().split(" ")))
        console.log("New gene: ", enteredGeneList);
    }

    const onSubmitGenes = () => {
        if (enteredGeneList.length === 0) return;

        const geneList = [...new Set(enteredGeneList)];
        console.log("Submit genes: ", geneList);
        console.log("State: ", state)

        getDataUsingGenesHandler(state, geneList)
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
                    <ScatterPlot analysisName={state}
                                 isChanged={clusterChanged}
                    />

                </div>
                <div>
                    <PlotSidePanel
                        analysisName={state}
                        onGeneExpressionColumnChange={onGeneExpressionColumnChange}
                        onColumnChange={onMetaColumnChange}
                        onNewGeneEnter={onNewGeneEnter}
                        onSubmitGenes={onSubmitGenes}
                    />
                </div>
            </div>
        </div>

    </div>)
}