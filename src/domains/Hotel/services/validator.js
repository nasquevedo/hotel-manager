export const validator = (formData) => {
    const errors = {}
    let isValid = true;

    if (formData.name === '') {
        errors.name = "El nombre es requerido"
        isValid = false;
    }

    if (formData.city_id === '') {
        errors.city = "La ciudad es requerido"
        isValid = false;
    }

    if (formData.address === '') {
        errors.address = "La direccion es requerido"
        isValid = false;
    }

    if (formData.nit === '') {
        errors.nit = "EL NIT es requerido"
        isValid = false;
    }

    if (formData.number_rooms === '') {
        errors.number_rooms = "El número de habitacoines es requerido"
        isValid = false;
    }

    return {
        isValid, 
        errors
    }
}