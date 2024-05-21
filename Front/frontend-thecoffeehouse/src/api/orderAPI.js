import axios from "../../axios";

const orderProduct = (body) => {
    return axios.post('/api/order-product', body)
}

const getLastestOrder = (limit, token) => {
    return axios.get(`/api/get-lastest-order?limit=${limit}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const getAllOrder = (token) => {
    return axios.get('/api/get-all-order', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const getAllOrderDelivered = (token) => {
    return axios.get('/api/get-all-order-delivered', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const deleteOrder = (id, token) => {
    return axios.delete(`/api/delete-order?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const payOrder = (id, token) => {
    return axios.put('/api/pay-order', id, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}


const deliverProduct = (id, token) => {
    return axios.put('/api/deliver-product', id, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}




export { orderProduct, getAllOrder, payOrder, deliverProduct, getAllOrderDelivered, getLastestOrder, deleteOrder }