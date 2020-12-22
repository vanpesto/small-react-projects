import React from 'react'
import Tour from './Tour'
function Tours({tours,removeTour}) {
    return (
        <section className="section-tours">
                <h3 className="tour-title">Our Tours</h3>
            <div>
                {tours.map((tours)=>{
                    return <Tour key={tours.id} {...tours} removeTour={removeTour}></Tour> 
                })
                }
            </div>
        </section>
    )
}

export default Tours
