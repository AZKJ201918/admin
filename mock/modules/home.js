const banners = {
    "endRow": 1,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "isFirstPage": true,
    "isLastPage": false,
    "list": [
        {
            "id": 1,
            "linktype": 2,
            "linkurl": "www.baidu.com",
            "sort": 1,
            "viewurl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg"
        },
        {
            "id": 2,
            "linktype": 2,
            "linkurl": "www.163.com",
            "sort": 2,
            "viewurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1347963075,2366097429&fm=26&gp=0.jpg"
        },
        {
            "id": 3,
            "linkid": "id=3",
            "linktype": 1,
            "linkurl": "/pages/product/product",
            "sort": 3,
            "viewurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1163926984,507042275&fm=26&gp=0.jpg"
        }
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 3,
    "navigatePages": 8,
    "navigatepageNums": [
        1,
        2,
        3
    ],
    "nextPage": 2,
    "pageNum": 1,
    "pageSize": 1,
    "pages": 3,
    "prePage": 0,
    "size": 1,
    "startRow": 1,
    "total": 3
}

const internalLink = [
    {
        "id": 1,
        "name": "品牌文化",
        "url": "/pages/wx-news/wx-news"
    },
    {
        "id": 2,
        "name": "品牌视频",
        "url": "/pages/video/video"
    },
    {
        "id": 3,
        "name": "商品详情",
        "url": "/pages/product/product"
    },
    {
        "id": 4,
        "name": "积分商城",
        "url": "/pages/Integral-mall/Integral-mall "
    },
    {
        "id": 5,
        "name": "每日签到",
        "url": "/pages/Integral-sigh/Integral-sigh "
    },
    {
        "id": 6,
        "name": "我的下级",
        "url": "/pages/personal-center/subordinate/subordinate "
    },
    {
        "id": 7,
        "name": "我的佣金",
        "url": "/pages/personal-center/commission/commission "
    },
    {
        "id": 8,
        "name": "积分商品详情",
        "url": "/pages/Integral-product/Integral-product "
    }
]

export default [
    // 轮播图
    {
        url: '/slideShow',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: banners
            }
        }
    },
    // 小程序内链
    {
        url: '/selectLink',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: internalLink
            }
        }
    }
]