import React, { useState } from 'react';
//useEffect
import './authors.css';
const Authors = () =>{
const [customers, setCustomers] = useState()
const [isLoading, setisLoading] = useState(false)
//    constructor() {
//        super();
//        this.state = {
//          customers: []
//        }
//    }
    //var customers = []
//    componentDidMount() {
//        fetch('/get/data')
//            .then(res => res.json())
//           .then(customers => this.setState({ customers }, () => console.log('Pobrani użytkownicy...', customers)))
//    }
    const handleButtonClick = async() =>{
            setisLoading(true);
            let temp = await fetch('/get/data').then(res => res.json());
            setisLoading(false);
            console.log(temp);
            setCustomers(temp);

    }
    const removeData = () =>{
        
        setCustomers();
    }
        if (isLoading) {
            return <p>Ładowanie</p>
        }


        return (

            <div>
                <h2>Autorzy:</h2>
                {customers &&                
                    <ul>
                        {customers.map(customer =>
                            <li key={customer.id}><p>{customer.firstName} {customer.lastName}</p></li>)}
                    </ul>   
                }
                {!customers &&
                    <div class="click_me" onClick={handleButtonClick}>Pokaż</div>

                }
                {customers &&
                    <div class="click_me" onClick={removeData}>Ukryj</div>
                }
            </div>
        );
}

export default Authors;
