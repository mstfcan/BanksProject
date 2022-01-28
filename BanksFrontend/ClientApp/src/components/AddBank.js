import { useFormik } from "formik";
import { useRef, useState } from "react";
import api from "../config/api";
import axios from "axios";

export default function AddBank() {
    const sendButtonRef = useRef();
    const [sendButtonText, setSendButtonText] = useState("Gönder");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Banka adı boş geçilemez.';
        } else if (values.name.length > 200) {
            errors.name = 'Banka adı 200 karakterden fazla olamaz.';
        }

        if (!values.address) {
            errors.address = 'Banka adresi boş geçilemez.';
        } else if (values.address.length > 500) {
            errors.address = 'Banka adresi 500 karakterden fazla olamaz.';
        }

        if (!values.description) {
            errors.description = 'Banka açıklaması boş geçilemez.';
        } else if (values.description.length > 1000) {
            errors.description = 'Banka açıklaması 1000 karakterden fazla olamaz.';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            description: ''
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            buttonChangeTextForLoading(true);
            sendFormValues(JSON.stringify(values));
            resetForm();
        },
    });

    const sendFormValues = async (values) => {

        axios.post(api.url + "/banks", values, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                buttonChangeTextForLoading(false);
                showInformationMessage("success");
            })
            .catch((error) => {
                buttonChangeTextForLoading(false);
                showInformationMessage("error");
            });

    };

    const buttonChangeTextForLoading = (status) => {
        if (status) {
            setSendButtonText("Lütfen bekleyiniz...");
            sendButtonRef.current.disabled = true;
        } else {
            setSendButtonText("Gönder");
            sendButtonRef.current.disabled = false;
        }
    }

    const showInformationMessage = (status) => {
        switch (status) {
            case "success":
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false),2000);
                break;
            case "error":
                setIsError(true);
                setTimeout(() => setIsError(false), 2000);
                break;
            default:
        }
    }

    return (
        <>
            <h1>Banka Bilgisi Ekle</h1>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-4">
                            <label htmlFor="name">Banka Adı</label>
                            <input
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Banka adını yazınız"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            {formik.errors.name ? <label className="text-danger">{formik.errors.name}</label> : null}
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="address">Banka Adresi</label>
                            <input
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder="Banka adresini yazınız"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />
                            {formik.errors.address ? <label className="text-danger">{formik.errors.address}</label> : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Banka Hakkında Açıklama</label>
                            <input
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder="Banka adresini yazınız"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                            {formik.errors.description ? <label className="text-danger">{formik.errors.description}</label> : null}
                        </div>

                        <button ref={sendButtonRef} type="submit" className="mt-4 btn btn-primary">{sendButtonText}</button>
                    </form>
                </div>
            </div>
            {isError &&
                <div className="alert alert-danger mt-4" role="alert">
                    Bir sorun oluştu lütfen daha sonra tekrar deneyiniz.
                </div>}
            {isSuccess &&
                <div className="alert alert-success mt-4" role="alert">
                    Banka bilgileri kayıt edildi.
                </div>}
        </>
    );
}