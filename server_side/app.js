var express = require("express");
var app = express();
var formidable = require("formidable");
var path = require("path");
var url = require("url");
var fs = require("fs");

//链接数据库
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ershouche", { useMongoClient: true });		//保证mongod了，CMD没有关闭

//引入模型文件
var Car = require("./models/Car.js");
 
//接口，查询某一个id的车的信息（包括images）
app.get("/carinfo/:id" , (req,res)=>{
	//得到:id的值
	var id = req.params.id;
	//查询数据库
	Car.find({id}).exec((err , results)=>{
		res.json({"result" : results[0]})		//车只有一辆，0表示这辆车
	});
});

//接口，查询和某一个id的车同品牌、同车系的车
app.get("/carlike/:id" , (req,res)=>{
	//得到:id的值
	var id = req.params.id;
	//先要知道查的这个车的品牌、车系
	Car.find({id}).exec((err , results) => {
		//得到你查询的这个id的品牌和车系
		var brand = results[0].brand;
		var series = results[0].series;
		//继续查询，
		Car.find({brand , series}).exec((err , results)=>{
			res.json({results});
		});
	});
});


//全部的品牌和车系
app.get("/brandandseries" , function(req,res){
	res.json({
		"A" : [
			{"奥迪" : ["A4","A5","Q5","Q7","Q9","TT"]},
			{"阿斯顿马丁" : ["DB9" ,"V8", "Rapide" ,"Virage" ,"DBS"]}
		],
		"B" : [
			{"本田" : ["雅阁", "思域", "CR-V","奥德赛", "飞度" ,"锋范", "凌派"]},
			{"宝马" : ["X5","X6"]},
			{"奔驰": ["A级", "B级", "C级","GLK级"]}
		],
		"D" : [
			{"东风" : ["雪铁龙","东风1号"]},
			{"大众" : ["桑塔纳" , "高尔夫" , "脉腾"]}
		],
		"L" : [
			{"路虎" : ["发现"]}
		],
		"R" : [
			{"日产" : ["骐达" , "楼兰" , "奇骏" , "天籁"]}
		],
		"X" : [
			{"雪佛兰": ["迈锐宝", "科迈罗", "景程" ,"乐风" ,"爱唯欧","科鲁兹"] }
		]
	});
});

//接口，查询车辆
app.post("/cars" , function(req,res){
	//fomidable语法
	var form = new formidable.IncomingForm();
	form.parse(req, (err, { filterinfo, pageinfo , sortinfo}) => {
		//查询对象
		var chaxunduixiang = {};
		//修正一些词语：将前端发来的“是”、“否”变为true、false
		 
			if (filterinfo.licence === "是"){
				chaxunduixiang.licence = true;
			} else if (filterinfo.licence === "否"){
				chaxunduixiang.licence = false;
			}
			  
		 

	 
		if (filterinfo.locality === "是") {
			chaxunduixiang.locality = true;
		} else if (filterinfo.locality === "否") {
			chaxunduixiang.locality = false;
			}

	 
	 
		//根据前端发来的对象，拼一个查询体
		for(var k in filterinfo){
			//数组类型的（复选框）、精确匹配的（品牌和类型）
			if(
				k == "brand" || 
				k == "series" || 
				k == "type" || 
				k == "color" || 
				k == "environmental" || 
				k == "gearbox" || 
				k == "displacement" || 
				k == "fuel"
			){
				if(filterinfo[k].length != 0){
					chaxunduixiang[k] = filterinfo[k];
				}
				
			}

			//验证范围匹配
			if(
				k == "price" ||
				k == "km" ||
				k == "buydate"
			){
				if (filterinfo[k].length != 0) {
					chaxunduixiang[k] = { "$gte": filterinfo[k][0], "$lte": filterinfo[k][1]}
				}
			}
		}

		//得到页面的分页信息
		var page = pageinfo.page;
		var pagesize = pageinfo.pagesize;
		//得到页面的排序信息
		var sortby = sortinfo.sortby;
		var sortdirection = sortinfo.sortdirection;

		//进行总量的计算
		Car.count(chaxunduixiang , (err , count)=>{
			page = count / pagesize < page ? Math.ceil(count / pagesize) == 0 ? 1 : Math.ceil(count / pagesize) : page
			//进行查询
			Car.find(chaxunduixiang).sort({ [sortby]: sortdirection }).skip(pagesize * (page - 1)).limit(pagesize).exec((err, docs) => {
				res.json({ 
					"count" : count , 	//数量
					"results": docs 	//结果
				})
			});
		});
	});
});


//监听端口
app.listen(3000 , (err)=>{
	console.log("run at 3000 port");
});