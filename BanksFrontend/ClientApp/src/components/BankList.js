import axios from "axios";
import { useEffect, useState } from "react";
import api from "../config/api";

export default function BankList() {
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        getBanks();
    }, []);

    const getBanks = () => {
        setLoading(true);
        axios.get(api.url + "/banks")
            .then((response) => {
                setBanks(response.data);
                setLoading(false);
            })
            .catch(() => {
                setBanks([]);
                setLoading(false);
            });
    }

    return (<>
        <h1>Bankalar</h1>
        {loading && <label>Lütfen bekleyiniz...</label>}
        {banks.length==0 && <label>Herhangi bir kayıt bulunamadı.</label>}
        {banks.map((bank) => {
            return (<div key={bank.id} className="card mb-4">
                <div className="card-header">
                    <h3>{ bank.name}</h3>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Banka Adresi</h5>
                    <p className="card-text">{bank.address}</p>
                    <h5 className="card-title">Banka Hakkında</h5>
                    <p className="card-text">{bank.description}</p>
                </div>
            </div>
            )
        })}
    </>);
}