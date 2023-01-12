import React, {useEffect, useRef, useState} from 'react';
import {Scatter} from 'react-chartjs-2';
import {Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import {getAnalysisCoordinatesHandler} from "../api/apiHandlers";

export function ScatterPlotNew(props) {
    const chartRef = useRef();
    ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
    ChartJS.register(zoomPlugin);

    const analysisName = props.analysisName;

    const [dataSets, setDataSets] = useState([]);

    const getAnalysisCoordinates = () => {
        function setCoordinates(coordinates) {
            let data = []
            for (let i = 0; i < coordinates.length; i++) {

                if (data.some(e => e.label === "Cluster: " + coordinates[i]['ClusterID'])) {
                    data.find(e => e.label === "Cluster: " + coordinates[i]['ClusterID']).data.push({
                        cell: coordinates[i]['Cell'],
                        x: coordinates[i]['UMAP1'],
                        y: coordinates[i]['UMAP2']
                    })
                } else
                    data.push({
                        label: "Cluster: " + coordinates[i]['ClusterID'],
                        data: [{
                            cell: coordinates[i]['Cell'],
                            x: coordinates[i]['UMAP1'],
                            y: coordinates[i]['UMAP2']
                        }],
                        backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
                        // borderColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
                    })
            }
            console.log(data)
            setDataSets(data);
        }


        getAnalysisCoordinatesHandler(analysisName)
            .then(res => {
                console.log("res.data", res.data);
                setCoordinates(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAnalysisCoordinates();
    }, [analysisName]);


    const options = {
        maintainAspectRatio: true,
        scales: {},

        plugins: {
            responsive: true,
            zoom: {
                pan: {
                    enabled: true,
                    mode: function () {
                        return 'xy';
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

        events: ['click'],
        onClick: function (e, element) {
            // console.log(e);
            // console.log(element);
            if (element.length > 0) {
                const index = element[0]._index;
                // console.log(index);
                // console.log(points[index]);
            }
        }
    };

    const data = {
        datasets: dataSets
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