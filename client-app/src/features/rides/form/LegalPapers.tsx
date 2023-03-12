import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup, Card, Grid, GridColumn, Header, Tab, Image } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { Records } from '../../../app/models/criminalRecord';
import { Liscence } from '../../../app/models/driverLiscence';
import { useStore } from "../../../app/stores/store";


export default observer(function LegalPapers()
{
    const {userStore:{user}} = useStore();
    const {profileStore: { isCurrentUser, uploadLiscence, uploading, 
        loading, deleteLiscence, uploadRecord,deleteRecord, loadProfile, profile, setActiveTab } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [addRecordMode, setAddRecordMode] = useState(false);
    const [target, setTarget] = useState('');

    useEffect(() => {
        loadProfile(user?.username);
    },[loadProfile, user?.username])
    
    function handlePhotoUpload(file: Blob) {
        uploadLiscence(file).then(() => setAddPhotoMode(false));
    }    
    function handleDeletePhoto(photo: Liscence, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deleteLiscence(photo);
    }
    function handleRecordUpload(file: Blob) {
        uploadRecord(file).then(() => setAddRecordMode(false));
    }  
    function handleDeleteRecord(photo: Records, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deleteRecord(photo);
    }  

    return(
        
        <Tab.Pane>
        <Header content='Upload your official papers here'></Header>
        <Grid>
                <GridColumn width={16}>
                    <Header floated='left' icon='image' content='Licence' />
                    {isCurrentUser &&(
                        <Button
                            id='homeButton'
                            content={addPhotoMode ? 'Cancel' : 'Add Licence'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
)}
                </GridColumn>
                <GridColumn width={16}>
                    <>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ):(
                        
                        <Card.Group itemsPerRow={5}>
                            {profile?.driverLiscences?.map(photo => (
                                <Card key={photo.id}>
                                    <Image size="big" src={photo.url} />
                                    {isCurrentUser &&(
                                    <ButtonGroup fluid widths={2}>
                                        <Button 
                                                basic
                                                color='red'
                                                icon = 'trash'
                                                name={photo.id}
                                                loading={target === photo.id && loading}
                                                onClick={e => handleDeletePhoto(photo,e)}
                                            />
                                    </ButtonGroup>)}
                                </Card>
                            ))}
                        </Card.Group>
                        )}</>
                </GridColumn>
                </Grid>
                <Grid>
                <GridColumn width={16}>
                    <Header floated='left' icon='image' content='Criminal Records' />
                    {isCurrentUser && (
                        <Button
                            id='homeButton'
                            content={addRecordMode ? 'Cancel' : 'Add Criminal Record'}
                            onClick={() => setAddRecordMode(!addRecordMode)}
                        />
                    )}
                </GridColumn>
                <GridColumn width={16}>
                    {addRecordMode ? (
                        <PhotoUploadWidget uploadPhoto={handleRecordUpload} loading={uploading} />
                    ):(
                        <Card.Group itemsPerRow={5}>
                            {profile?.criminalRecords?.map(photo => (
                                <Card key={photo.id}>
                                    <Image size="big" src={photo.url} />
                                    <Button 
                                                basic
                                                color='red'
                                                icon = 'trash'
                                                name={photo.id}
                                                loading={target === photo.id && loading}
                                                onClick={e => handleDeleteRecord(photo,e)}
                                            />
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </GridColumn>
        </Grid>
        </Tab.Pane>
    
    )
})