import React from 'react'
import Osa from './Osa'


const Sisalto = ({ kurssi }) => {
    return (
        kurssi.osat.map((element) => {
            return <Osa key={element.id} osa={element} />

        })
    )
}

export default Sisalto