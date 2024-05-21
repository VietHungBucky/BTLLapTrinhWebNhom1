import axios from "../../axios";


const getAdminById = (id, token) => {
    return axios.get(`/api/get-admin-by-id?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const deleteAdmin = (id, token) => {
    return axios.delete(`/api/delete-admin?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}


const updateAdminData = (body, token) => {
    return axios.put('/api/update-admin-data', body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const createNewProduct = (body, token) => {
    return axios.post('/api/create-new-product', body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}


const updateProductData = (body, token) => {
    return axios.put('/api/update-product-data', body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const createNewStore = (body, token) => {
    return axios.post('/api/create-new-store', body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const uploadMultiImageStore = (body, token) => {
    return axios.post('/api/upload-multi-image-store', body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}


const updateStoreData = (body, token) => {
    return axios.put('/api/update-store-data', body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const approveAdminById = (body, token) => {
    return axios.put(`/api/approve-admin-by-id`, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const createNewManager = (body, token) => {
    return axios.post('/api/create-new-manager', body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const deleteProduct = (id, token) => {
    return axios.delete(`${import.meta.env.VITE_BACKEND_PORT}/api/delete-product?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const deleteStore = (id, token) => {
    return axios.delete(`${import.meta.env.VITE_BACKEND_PORT}/api/delete-store?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}


export {
    deleteAdmin, updateAdminData, getAdminById, createNewProduct, updateProductData, createNewStore,
    uploadMultiImageStore, updateStoreData, approveAdminById, createNewManager, deleteProduct, deleteStore
}

// getAdminByEmail deleteProduct deleteStore