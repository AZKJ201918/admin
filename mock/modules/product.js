const products = {
    list: [
        {
            "beretail": 1,
            "commercial": {
                "activityList": [
                    {
                        "name": "满减1",
                        "type": "fullsubtract"
                    },
                    {
                        "name": "立减2",
                        "type": "subtract"
                    },
                    {
                        "name": "满打3",
                        "type": "fulldiscount"
                    },
                    {
                        "name": "打折4",
                        "type": "discount"
                    }
                ],
                "aid": "1,3,4,5",
                "cid": 1,
                "discount": 0.97,
                "endtime": 1582956746000,
                "fulld": 50,
                "fulldiscount": 0.98,
                "fulls": 60,
                "fullsubtract": 1,
                "id": 1,
                "postage": 15,
                "starttime": 1572243143000,
                "status": 1,
                "subtract": 100
            },
            "createtime": 1572243892000,
            "detailurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01JXNIlo20SQpDdnkDI_!!2956756848.jpg\",\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01D5AfM520SQp6RD1aP_!!2956756848.jpg\"]",
            "id": 1,
            "isintegral": 0,
            "name": "德里亚面膜",
            "price": 200,
            "repertory": 100,
            "retail": 0,
            "sales": 50,
            "saleurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01JXNIlo20SQpDdnkDI_!!2956756848.jpg\"]",
            "specsurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01JXNIlo20SQpDdnkDI_!!2956756848.jpg\"]",
            "status": 1,
            "subname": "123",
            "type": 1,
            "url": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=399355957,4288497410&fm=26&gp=0.jpg",
            "volumn": {
                "totalvolumn": 5,
                "volumn": 5
            }
        },
        {
            "beretail": 0,
            "commercial": {
                "activityList": [
                    {
                        "name": "满减1",
                        "type": "fullsubtract"
                    },
                    {
                        "name": "立减2",
                        "type": "subtract"
                    },
                    {
                        "name": "满打3",
                        "type": "fulldiscount"
                    },
                    {
                        "name": "打折4",
                        "type": "discount"
                    }
                ],
                "aid": "1,3,4,5",
                "cid": 2,
                "discount": 0.96,
                "endtime": 1573366373000,
                "fulld": 100,
                "fulldiscount": 0.97,
                "fulls": 500,
                "fullsubtract": 10,
                "id": 2,
                "postage": 10,
                "starttime": 1572243170000,
                "status": 1,
                "subtract": 100
            },
            "createtime": 1572243883000,
            "detailurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01D5AfM520SQp6RD1aP_!!2956756848.jpg\"]",
            "id": 2,
            "isintegral": 0,
            "name": "东起面膜",
            "repertory": 100,
            "price": 300,
            "retail": 1,
            "retailTable": {
                "cid": 2,
                "grand": 5, // 上上级
                "grandtype": 1, //如果是1 直接加grand钱 如果是0 乘grand百分比
                "id": 2,
                "outtime": 1573629951000,//过期时间
                "parent": 0.02, //上级
                "parenttype": 0 //如果是1 直接加grand钱 如果是0 乘grand百分比
            },
            "sales": 1000,
            "saleurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01D5AfM520SQp6RD1aP_!!2956756848.jpg\"]",
            "specsurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01D5AfM520SQp6RD1aP_!!2956756848.jpg\"]",
            "status": 1,
            "subname": "456",
            "type": 1,
            "url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2170225557,758070829&fm=26&gp=0.jpg",
            "wholeRetail": {
                "cid": 2,
                "grandtype": 0,
                "id": 2,
                "parenttype": 0,
                "wholegrand": 0.01,
                "wholeparent": 0.02
            }
        },
        {
            "beretail": 0,
            "commercial": {
                "activityList": [
                    {
                        "name": "满减1",
                        "type": "fullsubtract"
                    },
                    {
                        "name": "立减2",
                        "type": "subtract"
                    },
                    {
                        "name": "满打3",
                        "type": "fulldiscount"
                    },
                    {
                        "name": "打折4",
                        "type": "discount"
                    }
                ],
                "aid": "1,3,4,5",
                "cid": 3,
                "discount": 0.9,
                "endtime": 1572243192000,
                "fulld": 200,
                "fulldiscount": 0.96,
                "fulls": 200,
                "fullsubtract": 10,
                "id": 3,
                "postage": 10,
                "starttime": 1572243189000,
                "status": 1,
                "subtract": 100
            },
            "createtime": 1572243887000,
            "detailurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01D5AfM520SQp6RD1aP_!!2956756848.jpg\"]",
            "id": 3,
            "isintegral": 0,
            "name": "涅西夫面膜，超好用",
            "price": 400,
            "retail": 1,
            "retailTable": {
                "cid": 3,
                "grand": 0.03,
                "grandtype": 0,
                "id": 3,
                "outtime": 1573532553000,
                "parent": 5,
                "parenttype": 1
            },
            "sales": 500,
            "saleurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01D5AfM520SQp6RD1aP_!!2956756848.jpg\"]",
            "specsurl": "[\"https://img.alicdn.com/imgextra/i1/2956756848/O1CN01D5AfM520SQp6RD1aP_!!2956756848.jpg\"]",
            "status": 1,
            "subname": "223",
            "repertory": 100,
            "type": 1,
            "url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031612956,2771560768&fm=26&gp=0.jpg",
            "wholeRetail": {
                "cid": 3,
                "grandtype": 0,
                "id": 3,
                "parenttype": 1,
                "wholegrand": 0.02,
                "wholeparent": 5
            }
        },
        {
            "beretail": 0,
            "createtime": 1572236553000,
            "detailurl": "[\"http://img1.imgtn.bdimg.com/it/u=3302275813,2320378270&fm=26&gp=0.jpg\",\"http://img0.imgtn.bdimg.com/it/u=2448284914,1719980006&fm=26&gp=0.jpg\"]",
            "id": 4,
            "integralCommodity": {
                "cid": 4,
                "id": 1,
                "integral": 500,
                "num": 1
            },
            "isintegral": 1,
            "name": "丁婷面膜，喷喷",
            "price": 15,
            "repertory": 100,
            "retail": 0,
            "sales": 0,
            "saleurl": "[\"http://img2.imgtn.bdimg.com/it/u=3999674479,364576949&fm=26&gp=0.jpg\"]",
            "specsurl": "[\"http://img0.imgtn.bdimg.com/it/u=1720481286,1694014026&fm=26&gp=0.jpg\"]",
            "status": 1,
            "subname": "445",
            "type": 0,
            "url": "http://img3.imgtn.bdimg.com/it/u=1137884939,2803080844&fm=26&gp=0.jpg",
            "volumn": {
                "totalvolumn": 1,
                "volumn": 1
            }
        }
    ]
}

export default [

    // 查看全部商品
    {
        url: '/allCommodity',
        type: 'post',
        response: config => {
            return {
                code: 200,
                data: products
            }
        }
    }
]