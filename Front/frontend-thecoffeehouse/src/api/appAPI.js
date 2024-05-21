import axios from "../../axios";

const fetchAllAdmin = (token) => {
    return axios.get('/api/get-all-admin', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const fetchAllAdminNotApproved = (token) => {
    return axios.get('/api/get-all-admin-not-approved', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const fetchDataAllcodes = (type) => {
    return axios.get(`/api/get-allcode-by-type?type=${type}`)
}

const fetchAllProductByCategory = (category, page, itemsPerPage, limit) => {
    return axios.get(`/api/get-all-product-by-category?category=${category}&page=${page}&itemsPerPage=${itemsPerPage}&limit=${limit}`)
}

const fetchAllStoreByCity = (city, page, itemsPerPage, limit) => {
    return axios.get(`/api/get-all-store-by-city?city=${city}&page=${page}&itemsPerPage=${itemsPerPage}&limit=${limit}`)
}

const fetchDetailProductById = (id) => {
    return axios.get(`/api/get-detail-product-by-id?id=${id}`)
}

const fetchDetailStoreById = (id) => {
    return axios.get(`/api/get-detail-store-by-id?id=${id}`)
}

const fetchBestSeller = (limit) => {
    return axios.get(`/api/get-best-seller?limit=${limit}`,)
}

const fetchStatisticsApp = (token) => {
    return axios.get(`/api/get-statistics-app`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}



export {
    fetchDataAllcodes, fetchAllProductByCategory, fetchAllAdmin, fetchAllStoreByCity, fetchDetailProductById, fetchDetailStoreById,
    fetchAllAdminNotApproved, fetchBestSeller, fetchStatisticsApp
}