import {Chart} from "react-google-charts";
import {useEffect} from "react";
import {getAnalysisCoordinatesHandler} from "../api/apiHandlers";
import {useCallback} from "react";
import {Scatter} from 'react-chartjs-2';


export function ScatterPlot(props) {

    const analysisName = props.analysisName;

    const data = [
        // ['UMAP1', 'UMAP2'],
    ];

    function setCoordinates(coordinates) {
        for (let i = 0; i < coordinates.length; i++) {
            data.push(
                [
                    Number(coordinates[i]['UMAP1']),
                    Number(coordinates[i]['UMAP2'])
                ]
            );
        }
    }

    const getAnalysisCoordinates = useCallback(() => {
        getAnalysisCoordinatesHandler(analysisName)
            .then(res => {
                console.log(res.data.data);
                setCoordinates(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [analysisName]);


    useEffect(() => {
        getAnalysisCoordinates();
    }, [getAnalysisCoordinates]);


    const options = {
        title: analysisName,
        curveType: "function",
        // legend: {position: "bottom"},
        pointSize: 2,
        colors: ['#293456'],
        legend: 'none',
        pointShape: 'circle',
        vAxis: {
            gridlines: {
                baselineColor: 'transparent',
                color: 'transparent'
            }
        },
        hAxis: {
            gridlines: {
                baselineColor: 'transparent',
                color: 'transparent'
            }
        },

        chartArea: {left: 0, top: 0, width: "96%", height: "98%"},

    };

    return (

        <Chart
            width='100%'
            height='94%'
            chartType="ScatterChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
            chartEvents={[
                {
                    eventName: 'ready',
                    callback: ({chartWrapper, google}) => {

                        const chart = chartWrapper.getChart();
                        const dataTable = chartWrapper.getDataTable();

                        console.log('dataTable: ', dataTable);

                        google.visualization.events.addListener(chart, 'select', e => {

                            const selection = chart.getSelection();
                            if (selection.length === 0) return;

                            const row = selection[0].row;
                            const column = selection[0].column;
                            const value = dataTable.getValue(row, column);

                            console.log(value);

                        });

                        console.log("ready");
                    }
                }
            ]}
        />
    );
}