import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Porosia as IPorosia, PorosiaDetails } from '../../app/models/porosia'
import Artikujte from './Artikujte'
import PorosiaForm from './PorosiaForm'
import SelectedProducts from './SelectedProducts';
import {v4 as uuid} from 'uuid';
import { Ushqimi } from '../../app/models/ushqimi'
import { Pije } from '../../app/models/pije'
import { Embelsira } from '../../app/models/embelsira'

const generateRandomOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();


export default function Porosia() {

    const [values, setValues] = useState<IPorosia>({
        id: uuid(),
        numriPorosise: generateRandomOrderNumber(),
        metodaPageses: '',
        totali: 0,
        porosiaDetails: []
    })



    const addArtikujteUshqim = (foodItem: Ushqimi | Pije | Embelsira) => {
            let x: PorosiaDetails = {
                porosiaId: values.id,
                id: uuid(),
                ushqimiId: foodItem.id,
                cmimiArtikullit: foodItem.cmimi,
                emri: foodItem.emri,
                sasia: 1
            }
            setValues({
                ...values,
                porosiaDetails: [...values.porosiaDetails, x]
            })
    }

    const addArtikujtePije = (foodItem: Ushqimi | Pije | Embelsira) => {
        let x: PorosiaDetails = {
            porosiaId: values.id,
            id: uuid(),
            pijeId: foodItem.id,
            cmimiArtikullit: foodItem.cmimi,
            emri: foodItem.emri,
            sasia: 1
        }
        setValues({
            ...values,
            porosiaDetails: [...values.porosiaDetails, x]
        })
    }
    
    const addArtikujteEmbelsira = (foodItem: Ushqimi | Pije | Embelsira) => {
        let x: PorosiaDetails = {
            porosiaId: values.id,
            id: uuid(),
            embelsiraId: foodItem.id,
            cmimiArtikullit: foodItem.cmimi,
            emri: foodItem.emri,
            sasia: 1
        }
        setValues({
            ...values,
            porosiaDetails: [...values.porosiaDetails, x]
        })
    }



  return (
    <Container>
        <h1 style={{textAlign: 'center'}}>Make An Order</h1>
        <PorosiaForm values={values} setValues={setValues} />
        <Artikujte {...{addArtikujteUshqim, addArtikujtePije, addArtikujteEmbelsira,
            selectedProducts: values.porosiaDetails
            }} />
        <SelectedProducts  {...{values, setValues}}/>
    </Container> 
  )
}
