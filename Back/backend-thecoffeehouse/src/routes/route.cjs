const express = require('express')
const userController = require("../controllers/userController.js")
const adminController = require("../controllers/adminController.js")
const appController = require("../controllers/appController.js")
const orderController = require("../controllers/orderController.js")
const jwt = require("jsonwebtoken")
const db = require("../models/index.js")
const bcrypt = require('bcrypt');

const router = express.Router()

function initWebRoutes(app) {

    const authenManager = (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        // console.log('test1', token)
        if (!token) {
            return res.status(200).json({
                errCode: 'A',
                errMessage: "Bạn chưa đăng nhập"
            });
        }
        try {
            let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.roleId = data.roleId;
            req.id = data.id;
            if (req.roleId == 'R1') {
                next();
            }
            else {
                res.status(200).json({
                    errCode: 'C',
                    errMessage: `Bạn không phải quản lý`
                })
            }
        } catch (err) {
            console.log(err)
            res.status(200).json({ errMessage: 'Lỗi token' });
        }
    }

    const verifyUser = (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        // console.log('test2', token)
        if (!token) {
            return res.status(200).json({
                errCode: 'A',
                errMessage: "Bạn chưa đăng nhập"
            });
        }
        try {
            let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.roleId = data.roleId;
            req.id = data.id;
            next();
        } catch (err) {
            console.log(err)
            res.status(200).json({ errMessage: 'Lỗi token' });
        }


    }

    let checkEmailExist = (emailNew) => {
        return new Promise(async (resolve, reject) => {
            try {
                let emailExist = await db.Users.findOne({
                    where: { email: emailNew }
                })
                if (emailExist) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            } catch (e) {
                console.log(e);
                reject(e)
            }
        })
    }

    router.post('/api/login', async (req, res) => {
        if (await checkEmailExist(req.body.email) === false) {
            res.status(200).json({
                errCode: 1,
                errMessage: 'Tài khoản đã tồn tại, hãy nhập email khác',
            })
        } else {
            let user = await db.Users.findOne({
                where: { email: req.body.email, roleId: ['R1', 'R2'] }
            })
            if (user && user.password) {
                const checkPassword = bcrypt.compareSync(req.body.password, user.password)
                if (checkPassword === true) {
                    if (user.isApproved === 0) {
                        res.status(200).json({
                            errCode: 4,
                            errMessage: 'Tài khoản chưa được duyệt',
                        })
                    }
                    else if (user.isApproved === 1) {
                        let accessToken = jwt.sign(
                            { id: user.id, roleId: user.roleId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 }
                        );
                        res.status(200).json({
                            errCode: 0,
                            errMessage: 'Đăng nhập thành công',
                            accessToken,
                            email: user.email
                        })
                    }
                } else {
                    res.status(200).json({
                        errCode: 2,
                        errMessage: 'Sai mật khẩu',
                    })
                }
            } else {
                res.status(200).json({
                    errCode: 3,
                    errMessage: 'Bạn không phải nhân viên',
                })
            }
        }
    })

    router.get('/api/author', verifyUser, (req, res) => {
        return res.status(200).json({
            errCode: 0,
            roleId: req.roleId,
            id: req.id
        })
    })

    router.get('/', userController.getHome)
    router.post('/api/create-new-admin', userController.createNewAdmin)


    //admin (only manager call api)
    router.put('/api/approve-admin-by-id', verifyUser, adminController.approveAdminById)
    router.delete('/api/delete-admin', authenManager, adminController.deleteAdmin)
    router.put('/api/update-admin-data', authenManager, adminController.updateAdminData)
    router.get('/api/get-admin-by-id', authenManager, adminController.getAdminById)
    router.get('/api/get-all-admin-not-approved', authenManager, adminController.getAllAdminNotApproved)
    router.get('/api/get-all-admin', authenManager, adminController.getAllAdmin)
    router.post('/api/create-new-manager', authenManager, adminController.createNewManager)


    //product
    router.post('/api/create-new-product', verifyUser, adminController.createNewProduct)
    router.delete('/api/delete-product', authenManager, adminController.deleteProduct)
    router.put('/api/update-product-data', verifyUser, adminController.updateProductData)


    //store
    router.post('/api/create-new-store', verifyUser, adminController.createNewStore)
    router.post('/api/upload-multi-image-store', verifyUser, adminController.uploadMultiImage)
    router.delete('/api/delete-store', authenManager, adminController.deleteStore)
    router.put('/api/update-store-data', verifyUser, adminController.updateStoreData)


    //app
    router.get('/api/get-allcode-by-type', appController.getAllCodeByType)
    router.get('/api/get-all-product-by-category', appController.getAllProductByCategory)
    router.get('/api/get-all-store-by-city', appController.getAllStoreByCity)
    router.get('/api/get-detail-product-by-id', appController.getDetailProductById)
    router.get('/api/get-detail-store-by-id', appController.getDetailStoreById)
    router.get('/api/get-best-seller', appController.getBestSeller)
    router.get('/api/get-statistics-app', verifyUser, appController.getStatisticsApp)


    //order
    router.post('/api/order-product', orderController.orderProduct)
    router.get('/api/get-lastest-order', verifyUser, orderController.getLastestOrder)
    router.get('/api/get-all-order', verifyUser, orderController.getAllOrder)
    router.get('/api/get-all-order-delivered', verifyUser, orderController.getAllOrderDelivered)
    router.delete('/api/delete-order', authenManager, orderController.deleteOrder)
    router.put('/api/pay-order', verifyUser, orderController.payOrder)
    router.put('/api/deliver-product', verifyUser, orderController.deliverProduct)


    return app.use("/", router);
}

module.exports = initWebRoutes;
