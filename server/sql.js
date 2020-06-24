var sqlMap = {
	// 用户的操作
    user: {
        searchUser: 'select * from admin_user where username = ?',				  //查找用户
    },
    // 分类和标签操作
    categorys: {
        categoryList: 'select * from category left join template on category.temp_id=template.temp_id where p_id = ? order by sort_id',                    //查询一级二级分类 
        addCategory: 'insert into category(`sort_id`,`category_name`,`temp_id`) values ?',  //添加一级分类                                                                                     //技术分享列表
        addCategory02: 'insert into category(`p_id`,`sort_id`,`category_name`,`temp_id`,`category_desc`) values ?',  //添加二级分类                                                                                     //技术分享列表
        deleteCategory: 'delete from category where category_id = ?',             //删除一级分类
        categoryDetail: 'select * from category where category_id = ?',           //分类详情  
        updateCategory: 'update category set sort_id = ?,category_name = ?,temp_id = ? where category_id = ?',    //修改一级分类                                                                                   //技术分享列表
        updateCategory02: 'update category set sort_id = ?,category_name = ?,temp_id = ?,category_desc = ? where category_id = ?',    //修改二级分类                                                                                   //技术分享列表
        tagList: 'select * from tag where cate_id = ? order by sort_id',			                  //查询标签列表											                                             //技术分享列表
        addTag: 'insert into tag(`sort_id`,`cate_id`,`tag_name`) values ?',	      //添加标签
        delTag: 'delete from tag where tag_id = ?',							      //删除标签
        tagDetail: 'select * from tag where tag_id = ?',		                  //标签详情
        updateTag: 'update tag set sort_id = ?,tag_name = ? where tag_id = ?',	  //修改标签
        tempList: 'select * from template',                                       //查询模版
    },
    // 信息管理
    // infos: {
    //     infoList: 'select * from notes order by id desc limit ?,5',                                                                                                     //读书笔记列表
    //     addInfo: 'insert into info(`create_user_img`,`create_user_nickname`,`create_user_id`,`create_time`,`level_01_id`,`level_02_id`,`info_desc`,`contact`,`contact_phone`) values ?',                                   
    //     delInfo: 'delete from notes where id = ?',                                                                                           //删除读书笔记
    //     infoDetail: 'select * from notes where id = ?',                                                                                      //读书笔记详情
    // },
    // // 我的日志
    // logs: {
    //     logList: 'select * from logs order by id desc limit ?,5',                                                                                                       //读书笔记列表
    //     addLog: 'insert into logs(`title`,`descs`,`pageimg`,`content`,`createdTime`) values ?',                                     //添加读书笔记
    //     delLog: 'delete from logs where id = ?',                                                                                             //删除读书笔记
    //     logDetail: 'select * from logs where id = ?',                                                                                        //读书笔记详情
    //     updateLog: 'update logs set title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ? where id = ?',                    //修改读书笔记
    // },
    // // 草稿箱
    // drafts: {
    //     draftList: 'select * from draft',                                                                                                     //读书笔记列表
    //     addDraft0: 'insert into draft(`group`,`title`,`descs`,`pageimg`,`content`,`createdTime`,`ishome`,`isrecom`) values ?',                //添加草稿（技术分享）
    //     addDraft1: 'insert into draft(`group`,`title`,`descs`,`pageimg`,`content`,`createdTime`,`author`) values ?',                          //添加草稿（读书笔记）
    //     addDraft2: 'insert into draft(`group`,`title`,`descs`,`pageimg`,`content`,`createdTime`,`ishome`) values ?',                          //添加草稿（我的日志）
    //     delDraft: 'delete from draft where id = ?',                                                                                             //删除读书笔记
    //     draftDetail: 'select * from draft where id = ?',                                                                                        //读书笔记详情
    //     updateDraft0: 'update draft set title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ?,ishome = ?,isrecom = ? where id = ?',                    //修改读书笔记
    //     updateDraft1: 'update draft set title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ?,author = ? where id = ?',                    //修改读书笔记
    //     updateDraft2: 'update draft set title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ?,ishome = ? where id = ?',                    //修改读书笔记
    // },
    // // 最近在读
    // readings: {
    //     readList: 'select * from readings',                                                                                                      //读书笔记列表
    //     addRead: 'insert into readings(`name`,`author`,`descs`,`url`,`pageimg`) values ?',                                     //添加读书笔记
    //     delRead: 'delete from readings where id = ?',                                                                                             //删除读书笔记
    //     readDetail: 'select * from readings where id = ?',                                                                                        //读书笔记详情
    //     updateRead: 'update readings set name = ?,author = ?,descs = ?,url = ?,pageimg = ? where id = ?',                    //修改读书笔记
    // },
    // // 留言
    // message: {
    //     messageList: 'select * from message order by id desc limit ?,8',                                                                      //留言列表
    //     delMessage: 'delete from message where id = ?',                                                                                         //删除留言
    //     messageDetail: 'select * from message where id = ?',                                                                                    //留言详情
    // },
    // // 图片管理
    // imgs: {
    //     imgList: 'select * from imgs',                                                                                    //技术分享详情
    //     updateImg: 'update imgs set imgurl = ? where id = ?',    //修改技术分享
    // },
}

module.exports = sqlMap;