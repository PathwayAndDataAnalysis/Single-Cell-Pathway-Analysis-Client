import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {getElementsAtEvent, Scatter} from 'react-chartjs-2';
import {Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import {getAnalysisCoordinatesHandler} from "../api/apiHandlers";

export function ScatterPlotNew(props) {
    const chartRef = useRef();
    ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
    ChartJS.register(zoomPlugin);

    const analysisName = props.analysisName;

    const points = [];

    const getAnalysisCoordinates = useCallback(() => {

        function setCoordinates(coordinates) {
            for (let i = 0; i < coordinates.length; i++) {
                const p = {
                    x: Number(coordinates[i]['UMAP1']),
                    y: Number(coordinates[i]['UMAP2'])
                }

                if (points.includes(p) === false)
                    points.push(p);
            }
        }

        getAnalysisCoordinatesHandler(analysisName)
            .then(res => {
                console.log(res.data.data);
                setCoordinates(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [analysisName, points]);


    useEffect(() => {
        getAnalysisCoordinates();
    }, [getAnalysisCoordinates]);


    const options = {
        dragData: true,
        onDragStart: function (e) {
            // console.log(e)
        },
        onDrag: function (e, datasetIndex, index, value) {
            // console.log(datasetIndex, index, value)
        },
        onDragEnd: function (e, datasetIndex, index, value) {
            // console.log(datasetIndex, index, value)
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            beginAtZero: false,
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: function () {
                        // if (eventOutsideDataPoint) {
                        return 'xy';
                        // }
                        // return ''
                    }
                },
                zoom: {
                    enabled: true,
                    wheel: {enabled: true,},
                    pinch: {enabled: true},
                    mode: 'xy',
                }
            }
        },
        gridLines: {
            display: false
        },

        interaction: {mode: 'point'},
        events: ['click'],
        onClick: function (e, element) {

            console.log(e);
            console.log(element);

            if (element.length > 0) {
                const index = element[0]._index;
                console.log(index);
                console.log(points[index]);
            }

        }
    };

    const data = {
        datasets: [
            {
                label: 'Dataset1',
                data: points,
                backgroundColor: 'rgb(255,28,71)',
            },
        ],
    };

    return (
        <Scatter
            ref={chartRef}
            width='95%'
            height='90%'
            data={data}
            options={options}
        />
    );
}