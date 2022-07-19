import { observer } from 'mobx-react-lite';
import  { useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { useStore } from '../../app/stores/store';
import {AiFillPlusCircle} from 'react-icons/ai';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Ushqimi } from '../../app/models/ushqimi';
import { Pije } from '../../app/models/pije';
import { Embelsira } from '../../app/models/embelsira';
import { PorosiaDetails } from '../../app/models/porosia';

interface Props{
    addArtikujteUshqim: (foodItem: Ushqimi | Pije | Embelsira) => void;
    addArtikujtePije: (foodItem: Ushqimi | Pije | Embelsira) => void;
    addArtikujteEmbelsira: (foodItem: Ushqimi | Pije | Embelsira) => void;
    selectedProducts: PorosiaDetails[];
}

export default observer(function Artikujte({addArtikujteUshqim,addArtikujtePije,addArtikujteEmbelsira, selectedProducts}: Props) {
    const { ushqimiStore, pijeStore, embelsiraStore } = useStore();
    const { ushqimiRegistry, ushqimetByCmimi, loadUshqimet, loadingInitial } = ushqimiStore;
    const { pijeRegistry, pijetByCmimi, loadPijet } = pijeStore;
    const { embelsiraRegistry, embelsiratByCmimi, loadEmbelsirat } = embelsiraStore;
    

    useEffect(() => {
        if (ushqimiRegistry.size <= 1) loadUshqimet();
    }, [ushqimiRegistry.size, loadUshqimet])

    

    useEffect(() => {
        if (pijeRegistry.size <= 1) loadPijet();
    }, [pijeRegistry.size, loadPijet])

    useEffect(() => {
        if (embelsiraRegistry.size <= 1) loadEmbelsirat();
    }, [embelsiraRegistry.size, loadEmbelsirat])

    if(loadingInitial) return <LoadingComponent />

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px' }}>
            <Card style={{ width: '18rem' }}>
                <h5 style={{textAlign: 'center'}}>Ushqimet</h5>
                <ListGroup variant="flush" className='artikulli-list-group'>
                    {ushqimetByCmimi.map(ushqimi => (
                        <ListGroup.Item key={ushqimi.id} onClick={e => addArtikujteUshqim(ushqimi)}>{ushqimi.emri} - ${ushqimi.cmimi} <AiFillPlusCircle style={{float: 'right', color:'#3333'}} /></ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card style={{ width: '18rem' }}>
                <h5 style={{textAlign: 'center'}}>Pijet</h5>
                <ListGroup variant="flush" className='artikulli-list-group'>
                    {pijetByCmimi.map(pije => (
                        <ListGroup.Item key={pije.id} onClick={e => addArtikujtePije(pije)}>{pije.emri} - ${pije.cmimi} <AiFillPlusCircle style={{float: 'right',color:'#3333'}} /></ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card style={{ width: '18rem' }}>
                <h5 style={{textAlign: 'center'}}>Embelsirat</h5>
                <ListGroup variant="flush" className='artikulli-list-group'>
                    {embelsiratByCmimi.map(embelsira => (
                        <ListGroup.Item key={embelsira.id} onClick={e => addArtikujteEmbelsira(embelsira)}>{embelsira.emri} - ${embelsira.cmimi} <AiFillPlusCircle style={{float: 'right',color:'#3333'}} /></ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </div>
    )
})
