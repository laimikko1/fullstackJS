import React from 'react'

const Yhteensa = ({ kurssi }) => {

    console.log(kurssi.osat)
    const yhteensa =
        kurssi.osat.reduce((tehtavat, osa) => tehtavat + osa.tehtavia, 0);

    return (
        <div>yhteensä {yhteensa} tehtävää</div>
    )
}

export default Yhteensa