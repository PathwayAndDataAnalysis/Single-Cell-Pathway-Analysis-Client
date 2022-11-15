import NavBar from "../navBar";
import {UploadData} from "../other/uploadData";
import {FileItemLayout} from "../other/fileItemLayout";
import {ActionButton} from "../buttons/actionButton";
import {
    deleteAnalysisHandler,
    deleteFileHandler,
    getAllAnalysisHandler,
    getAllFilesHandler,
    uploadFileHandler
} from "../api/apiHandlers";
import {AnalysisItemLayout} from "../other/analysisItemLayout";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function HomePage(props) {

    useEffect(() => {
        getAllFiles();
        getAllAnalysis();
    }, []);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [allFiles, setAllFiles] = useState([]);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [allAnalysis, setAllAnalysis] = useState([]);

    // Navigation
    const navigate = useNavigate()

    function getAllFiles() {
        getAllFilesHandler()
            .then(res => {
                let temp = [];
                for (let i = 0; i < res.data['files'].length; i++)
                    temp.push(res.data['files'][i]);
                setAllFiles(temp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function getAllAnalysis() {
        getAllAnalysisHandler()
            .then(res => {
                let temp = [];
                for (let i = 0; i < res.data['analysis'].length; i++)
                    temp.push(res.data['analysis'][i]);
                setAllAnalysis(temp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function deleteFile(file) {
        deleteFileHandler(file)
            .then((response) => {
                getAllFiles();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteAnalysis(analysis) {
        deleteAnalysisHandler(analysis)
            .then((response) => {
                getAllAnalysis();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function onFileChange(event) {
        setSelectedFiles(event.target.files[0]);
    }

    function onFileUpload() {
        let setPercentage = (completed) => {
            setUploadPercentage(completed);
        }

        let config = {
            onUploadProgress: function (progressEvent) {
                let percCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setPercentage(percCompleted);
            },
            headers: {'Content-Type': 'multipart/form-data'}
        };

        uploadFileHandler(selectedFiles, config)
            .then((response) => {
                getAllFiles();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (<div>
            <div>
                <NavBar/>
            </div>

            <div className='container mx-auto'>
                <h1 className='text-left text-xl mt-4 mb-2'>Files:</h1>

                <div
                    className='my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>

                    <UploadData
                        onUploadClick={onFileUpload}
                        onFileChange={onFileChange}
                        uploadPercentage={uploadPercentage}
                    />

                    {// check if allFiles is empty
                        allFiles.length === 0 ? // if empty, show empty layout
                            <div className="flex justify-center items-center p-4">
                                <p className="text-lg">No files uploaded yet</p>
                            </div> : // if not empty, show all files
                            allFiles.map((file, index) => {
                                return (<FileItemLayout keyValue={index}
                                                        fileName={file['fileName']}
                                                        fileSize={file['fileSize']}
                                                        uploadDate={file['uploadDate']}
                                                        onDeleteClick={deleteFile.bind(this, file['fileName'])}
                                />)
                            })}
                </div>


                <h1 className='text-left text-xl mt-6 mb-2'>Analysis:</h1>

                <div
                    className='my-4 grid-cols-1 divide-y block p-6 max-w-none bg-white rounded-lg border border-gray-200 shadow-md'>
                    {
                        allAnalysis.length === 0 ?
                            <div className="flex justify-left items-left p-4">
                                <p className="text-lg">No analysis done yet</p>
                            </div> :
                            allAnalysis.map((file, index) => {
                                return (
                                    <AnalysisItemLayout
                                        keyValue={index}
                                        analysisName={file['analysisName']}
                                        onViewClick={() => {
                                            navigate(`/view/analysis/${file['analysisName']}`,
                                                {
                                                    state: file['analysisName']
                                                }
                                            )
                                        }}
                                        onEditClick={() => {
                                            navigate('/analysis/' + file['analysisName'], {
                                                state: file['analysisParams']
                                            });
                                        }}
                                        onDeleteClick={deleteAnalysis.bind(this, file['analysisName'])}
                                    />
                                )
                            })
                    }

                    <div className='flex flex-row justify-end mt-6'>
                        <ActionButton text='New Analysis'
                                      type='button'
                                      onClick={() => {
                                          window.location = '/new-analysis'
                                      }}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}