var dataArray=new Array();
var schoolname= "JSS Public School";
var address ="Sector 71, Delhi";
var scn1 = "";
var base_url = "http://greyboxerp.com/xavier/";
//var base_url = "http://localhost/pgexample/sbsj/www/";

function schoolDetails(data){
	schoolname = data[0]['name'];
	address = data[0]['address'];
	scn1 = data[0]['cn1'];
	
	//<script>setTimeout(function () {getData('','','school_details',0,0,9);}, 600);
	//setTimeout(function () {alert(schoolname +  address);}, 300);
	//</script>
}
function donothing(a,b){}

function getData(tblId,tblHdrId, q, addRow,deleteRow, procFn) {
	 
	var sql = "q=" + q;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				//alert(req.responseText);
				if(req.responseText.indexOf("Logged out") !== -1)
					window.location = "login.html";
				
				var dataArray=JSON.parse(req.responseText);
				//alert(JSON.stringify(dataArray));
				if(procFn ==0)
					updateDom(dataArray,tblId,tblHdrId,addRow,deleteRow,1);
				if(procFn==3)
					updateAttendance(dataArray,tblId,tblHdrId);
				if(procFn==2)
					createLayout(dataArray,tblId,tblHdrId);
				if(procFn==4)
					schoolView(dataArray,tblId,tblHdrId);
				if(procFn==5)
					viewStudent(dataArray,tblId,tblHdrId);
				if(procFn==6)
					viewRoutes(dataArray,tblId,tblHdrId);
				if(procFn==7)
					verifyUsr(dataArray);
				if(procFn==8)
					holiday(dataArray);
				if(procFn==9)
					schoolDetails(dataArray);
				if(procFn>100)
					custom(dataArray,procFn);
				
								
			} catch (e) {
				if(procFn==7)
					verifyUsr(dataArray); // if no result catch it here
				
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
		
	req.open("GET", base_url + "/dataTbl.php?" +  sql, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send();
	
}

function updateDom(data,tblId,tblHdrId,addRow,deleteRow, updatethead){
	//Do DOM updates here
	//alert(JSON.stringify(data));
	
	var tblElement=document.getElementById(tblId);
	var tblHeadElement = document.getElementById(tblHdrId);
	var tbodyData="";
	var theadData="";
		
	if(data.length >0)
	{
		for(var key in data[0])	{
			theadData += "<th>" + key + "</th>";
		}
		if(addRow)
			theadData += "<th></th>";
		if(deleteRow)
			theadData += "<th></th>";
	}
	
	for (var i = 0; i < data.length; i++) {
		tbodyData +="<tr>";
		for(var key in data[i])	{
			if(addRow ==2){
				if(key =='admn'){
					var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
					tbodyData += "<td ><a target='_blank' href='student_details.html?id="+data[i][key]+"'>" + data[i][key] + "</a></td>";
					tbodyData += "<td width=7%'><a href='"+base_url+"/view_student.html?sid=" + data[i][key]+"' target='_blank'>" +"<i class='fa fa-edit'></i>" +  "</a></td>";
					tbodyData += "<td width=7%'><a href='"+base_url+"/viewresult.html?sid=" + data[i][key] + "&name="+data[i]['name']+"&class="+data[i]['class']+"' target='_blank'>" +"<i class='fa fa-graduation-cap' aria-hidden='true'></i>" +  "</a></td>";
					tbodyData += "<td width=7%'><a href='"+base_url+"/admtcard.html?sid=" + data[i][key] +"' target='_blank'>" +"<img src='./img/admt_card.jfif' width='20' height='20'>" +  "</a></td>";
					tbodyData += "<td width=5%'><a href='"+base_url+"/add_voucher.html?sid=" + data[i][key] + "&name="+data[i]['name']+"&class="+data[i]['class']+"' target='_blank'>" +"<img src='./img/rupee.png' width='15' height='15'>" +  "</a></td>";
					
					//alert(data[i][key]);
				}
				else
				tbodyData += "<td >" + data[i][key] + "</td>";
			}
			else
				tbodyData += "<td >" + data[i][key] + "</td>";
		}
		if(addRow==1){
			tbodyData += "<td width='5%' id='"+tblId+"_"+i+"' onclick='addRow(this.parentNode)'><b class='glyphicon glyphicon-plus'></td>";
			tbodyData += "<td width='5%' id='"+tblId+"_e"+i+"' onclick='editRow(this.parentNode)'><i class='fa fa-edit'></i></td>";
			
		}
		else if(addRow==3){
			tbodyData += "<td width='5%' id='"+tblId+"_p"+i+"' onclick='addPrint(this.parentNode)' data-toggle='tooltip' title='Print Receipt'><i class='fa fa-print' aria-hidden='true'></i></td>";
			tbodyData += "<td width='5%' id='"+tblId+"_s"+i+"' onclick='sendFeeSMS(this.parentNode)' data-toggle='tooltip' title='Send SMS'><i class='fa fa-mobile' aria-hidden='true'></i></td>";
			
		}
		if(deleteRow==1)
			tbodyData += "<td width='5%' onclick='deleteRow(this.parentNode)'><b class='glyphicon glyphicon-minus'></td>";
			
		tbodyData +="</tr>";
	}
	if(updatethead)
		tblHeadElement.innerHTML=theadData;
	
	tblElement.innerHTML=tbodyData;
	
}



function getDropDownData(ddId,q) {
	
	var sql = "q=" + q;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				//alert(req.responseText);
				var dataArray=JSON.parse(req.responseText);
				updateDD(dataArray,ddId);
				
			} catch (e) {
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("GET", base_url + "/dataTbl.php?" + sql, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send();
	
}

function updateDD(data,ddId){
	//Do DOM updates here
	
	
	var ddElement=document.getElementById(ddId);
	var ddData="";
	var flag =0;
	// This query requires atleaset 2 params, if 3 params are there store it in dummy attribute.
	// Thsi third param may be used later.
		if(data[0][Object.keys(data[0])[2]]!=null)
			flag=1;
			
	for (var i = 0; i < data.length; i++) {
		//alert(data[i][Object.keys(data[i])[0]]);
		if(flag)
			ddData +="<option id='"+data[i][Object.keys(data[i])[0]]+"' value='"+data[i][Object.keys(data[i])[0]]+"' test='"+data[i][Object.keys(data[i])[2]]+"'>" + data[i][Object.keys(data[i])[1]] + "</option>";
		else		
			ddData +="<option id='"+data[i][Object.keys(data[i])[0]]+"' value='"+data[i][Object.keys(data[i])[0]]+"'>" + data[i][Object.keys(data[i])[1]] + "</option>";
	}
	
	ddElement.innerHTML=ddData;
	
}

function getTable(tblId,tblHdrId, col, addRow,deleteRow) {
	 var tblElement=document.getElementById(tblId);
	var tblHeadElement = document.getElementById(tblHdrId);
	var tbodyData="";
	var theadData="";
	var data = col.split(",");
	
	if(data.length >0)
	{
		for(var i=0; i < data.length; i++)	{
			theadData += "<th>" + data[i] + "</th>";
		}
		if(addRow)
			theadData += "<th></th>";
		if(deleteRow)
			theadData += "<th></th>";
	}
	
	
	tblHeadElement.innerHTML=theadData;
	tblElement.innerHTML=tbodyData;
	
	
	
}

function updateTbl(tblId,q){
var sql = "q=" + q;

	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				
				var dataArray=JSON.parse(req.responseText);
				//alert(JSON.stringify(dataArray));
				updateDom(dataArray,tblId,tblId,0,0,0);
				
			} catch (e) {
				console.log("Exception::-"+e.toString());
				var tblElement=document.getElementById(tblId);
				tblElement.innerHTML="";
			}
		}
	};
	
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("POST", base_url + "/dataTbl.php", true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(sql);
}



function insertData(tbl,colList,valList,flg){
	
	var res = valList.split(",");
	var val = "";
	if(flg){
	for (var i = 0; i < res.length; i++) {
		
		val = val + "'"+ getElementValue(res[i])+ "'";
		if(i < (res.length-1))
			val = val + ","
	}
	}
	else{
		val = valList;
	}
	
	var sql = "tbl=" + tbl + "&colList="+colList + "&valList=" + val;
	
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				//alert(req.responseText);
				alert("Added successfully");
				location.reload();
								
			} catch (e) {
				alert("Some errors have occured to add/update...");
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("POST", base_url + "/dataInsert.php", true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//alert(sql);
	req.send(sql);
}

function getElementValue(id){
	return  document.getElementById(id).value;

}


function filterTbl(inputElementId,tblId,flg){
	// if field is input use flg=0 if dropdown flg=1
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById(inputElementId);

  filterid = input.value.toUpperCase();
  if(flg==0)
	filter = document.getElementById(filterid).innerHTML.toUpperCase();
  else
	filter = filterid;
  table = document.getElementById(tblId);
  tr = table.getElementsByTagName("tr");
	//alert(filter);

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }

}

function getFeeDetails(sid,tilldate,cid,tblBodyId) {
	
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		
		if (req.readyState == 4 && req.status == 200) {
			try {
				// alert(req.responseText);
				var dataArray= JSON.parse(req.responseText);
				
				var tblBodyElement = document.getElementById(tblBodyId);
				var tbodyData="";
				var i =1;
				for(key in dataArray){
					tbodyData +="<tr>";
					if(key.trim() === 'Total'){
						tbodyData += "<td></td>";
						tbodyData += "<td ><b><small>" + key + "</small></b></td>";
						tbodyData += "<td></td>";
						//tbodyData += "<td></td>";
						tbodyData += "<td></td>";
						tbodyData += "<td ><b>" + dataArray[key] + "</b></td>";
						tbodyData += "<td></td>";
					}else if(key.trim() === 'Balance'){
						tbodyData += "<td></td>";
						tbodyData += "<td bgcolor='#faffbd'><b>" + "Balance" + "</b></td>";
						tbodyData += "<td></td>";
						//tbodyData += "<td></td>";
						tbodyData += "<td></td>";
						tbodyData += "<td bgcolor='#faffbd'><b>" + dataArray[key] + "</b></td>";
						tbodyData += "<td></td>";
					}else if(key.trim() === 'TransportTotal'){
						tbodyData += "<td>"+"</td>";
						tbodyData += "<td><small>" + "TransportTotal" + "</small><br><a href='transporthistory.html?sid="+sid+"' target='_blank'><small>Details</small></a></td>";
						tbodyData += "<td></td>";
						//tbodyData += "<td></td>";
						tbodyData += "<td></td>";
						tbodyData += "<td >" + dataArray[key]['value'] + "</td>";
						tbodyData += "<td></td>";
					}					
					else{
					
					tbodyData += "<td>" +  "</td>";
					tbodyData += "<td><small>" + key + "</small></td>";
					//tbodyData += "<td width='5%'>" + dataArray[key]['frequency'] + "</td>";
					tbodyData += "<td>" + dataArray[key]['from'] + "</td>";
					tbodyData += "<td>" + dataArray[key]['till'] + "</td>";
					tbodyData += "<td>" + dataArray[key]['value'] + "</td>";
					tbodyData += "<td></td>";
					i=i+1;
					}
					tbodyData +="</tr>";
	}
		
	tblBodyElement.innerHTML=tbodyData;
	
				
			} catch (e) {
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
	var base_url = "http://theqalabs.com/mobile/www";//"http://localhost/pgexample/appSample/www";
	
	req.open("POST", base_url + "/feealgo.php", true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//alert("sid=" + sid + "&tilldate=" + tilldate);
	req.send("sid=" + sid + "&tilldate=" + tilldate);
	
}

function getResult(sid,id,tag,cid) {
	
	var sql = "sid=" + sid +  "&id=" + id + "&tag=" + tag + "&cid=" + cid;
	
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				//alert(req.responseText);
				var d=JSON.parse(req.responseText);
				var subs = d["subdetail"];
				var txt = "<table style='width:90%;margin: 0 auto;margin-top:65px;'>";
				txt += '<caption style="text-align:center"><img src="./img/logo1.png" style="" width="50px"></img>	</caption>';
				txt += "<caption style='color:#337ab7;padding:2px;'>Class Strength : <b>"+d["st"]+"</b></caption>";
				txt += "<caption style='color:#337ab7;padding:2px;padding-bottom:10px;'>Test Name : <b>"+tag+"</b></caption>";
				txt += "<tr class='trhead'><th>Subjects</th><th>Max</th><th>Obtained</th></tr>";
				for(var i=0;i<subs.length;i++){
					txt += "<tr><td class='valtext text-uppercase'>" + subs[i]["subject"] + "</td>";
					txt += "<td id=mx_"+subs[i]["id"]+"></td><td style='font-weight:600;' id=o_"+subs[i]["id"]+"></td>";
					txt += "</tr>";
				}
				txt += "<tr style='border-top: 1px solid #337ab7;'><td><b>TOTAL</b></td><td id='totmax'><td class='valtext' style='font-weight:600' id='tot'></td></td></tr>";
				txt += "<tr style='border-top: 1px solid #337ab7;'><td>PERCENT</td><td id='per' colspan='2'></tr>";
				txt += "<tr style='border-top: 1px solid #337ab7;'><td>RANK</td><td colspan='2'>"+d["rank"]+"</td></tr>";
				txt += "</table>";
				document.getElementById("menu").innerHTML = txt;
				
				// Fill Obtained marks
				var marks = d["marks"];
				var tot = 0;
				for(var i=0;i<marks.length;i++){
					document.getElementById("o_"+marks[i]["id"]).innerHTML = marks[i]["marks"];
					tot += parseFloat(marks[i]["marks"]);
				}
				document.getElementById("tot").innerHTML = tot.toFixed(1);
				
				// Fill Max marks
				var max = d["max"];
				var totmax = 0;
				for(var i=0;i<max.length;i++){
					document.getElementById("mx_"+max[i]["subid"]).innerHTML = max[i]["mm"];
					totmax += parseFloat(max[i]["mm"]);
				}
				document.getElementById("totmax").innerHTML = totmax;
				document.getElementById("per").innerHTML = "<b> "+((tot/totmax)*100).toFixed(1) + "%</b>";
				
			} catch (e) {
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
	req.open("GET", base_url + "/_getSubClass.php?"+sql, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send();
	
}

function postData(q,msg) {
	 
	var sql = "q=" + q;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				
				//alert(JSON.stringify(dataArray));
				alert(msg);
				
			} catch (e) {
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("POST", base_url + "/dataTbl.php", true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(sql);
	
}

function setAttr(ele,a,v){
	var att = document.createAttribute(a);
	att.value= v;
	ele.setAttributeNode(att);
	
}


	
function postTblData(q,tblId,f){
	
		var sql =  q;
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			//alert(req.responseText);
			notifymsg();
			if(req.responseText.indexOf('successfully')!==-1){
				document.getElementById(tblId).innerHTML="";
			}
		}
		};
	
		var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
		req.open("POST", base_url + "/" +f, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		req.send(sql);
	  }
	  
	  function notifymsg(){
		$.notify({
			icon : 'pe-7s-gift',
			message : "Result Updated Successfully!!</b>" 

		}, {
			type : 'info',
		timer : 1000
		});
	  }
	  	
	function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
 

//colList is array of index of columns like 0,1,2
//tblColList is array of column ames in DB
// f is table to DB
function saveTblData(tbl,c,t,f){

		var colList = c;
		var tblColList = t;
		
         var result = []; 
         var row = tbl.rows.length ; // excluding heading
      
      	for (var i=0; i < row; i++) {
			var rowData = [];
			
			for(var j=0;j < tblColList.length; j++){
				var x = colList[j];	
				rowData.push(tbl.rows[i].cells[x].innerHTML);
			}
			result.push(rowData);
        }     
      	var secret = JSON.stringify(result);
	
		var params = "secret="+secret;
		params += "&tbl="+ f;
		params += "&columns=" + JSON.stringify(t);
		//alert(".." + params);
		postTblData(params,"",'saveTblResult.php');
		location.reload();
      	
  }

  
  function searchStudent(k,f, procFn){
	var params = "k="+k;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				
				var dataArray=JSON.parse(req.responseText);
				//alert(JSON.stringify(dataArray));
				if(procFn == 1)
					updateDom(dataArray,'table1','thead1',2,0,0);
				if(procFn == 2)
					attendanceTbl(dataArray,'table1','thead1');
				
			} catch (e) {
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("POST", base_url + "/" + f, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(params);
}

 function login(uname,pwd){
	 var sql = "uname=" + uname + "&pwd=" + pwd;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try{
				//alert(req.responseText);
				data = req.responseText;
				if(!data)
					document.getElementById("footer").innerHTML = "Username or Password not correct.<br> Please try again.";
				else if(data=='admin')
					window.location.href="index.html";
				else
					window.location.href="searchresult.html";
			}catch (e) {
					document.getElementById("footer").className = "bg-danger";
					document.getElementById("footer").innerHTML = "Username/Password not correct. Please try again.";
					console.log("Exception::-"+e.toString());
			}
		}
	};
	
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("POST", base_url + "/verifyUser.php", true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(sql);
	
 }
 
 function createFormattedCell(c1,txt,disabled){
	
	if(disabled){
		var att = document.createAttribute("contenteditable");
		att.value= "true";
		c1.setAttributeNode(att);
	
		att = document.createAttribute("bgcolor");
		att.value= '#faffbd';
		}
	else{
			var att = document.createAttribute("disabled");
			att.value= "true";
			c1.setAttributeNode(att);
			
			att = document.createAttribute("bgcolor");
		att.value= '#f0f0f0';
		}
	c1.setAttributeNode(att);
	
	var newText  = document.createTextNode(txt);
	c1.appendChild(newText);
}

function sendSMS(mobile,msg){
	var param = "mobile="+ mobile + "&msg=" + msg;
	//alert(param);
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			try {
				//document.getElementById('cn_'+mobile).innerHTML = 'Done';
				smsCallback(req.responseText);
			} catch (e) {
				console.log("Exception::-"+e.toString());
			}
		}
	};
	
	var base_url = document.URL.substr(0,document.URL.lastIndexOf('/'));
	
	req.open("POST", base_url + "/sms.php?" + param, true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send();
}

function endOfLastMonth(){
	var x = new Date();
	x.setDate(1);
	
	var m = x.getMonth();
	var y = x.getFullYear();
	var max_days = new Date(y, m, 0).getDate();
	// again increment month to go to current month and year
	x.setMonth(x.getMonth()-1);
	m = x.getMonth();
	y = x.getFullYear();
			
	var local = new Date(y,m,max_days);
		
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0,10);
}

function formatDate(dt){
	try{
		var dateObj = new Date(dt);
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();

		newdate =  getM(month) + " " + day + ", " + year;
		return newdate;
	} catch(e){return dt;}
}

function getM(m){
 if(m > 12)
	m =  m- 12;
 if(m==1)
 	return "Jan";
 else if(m==2)
    return "Feb";
 else if(m==3)
    return "Mar"; 
 else if(m==4)
    return "Apr";  
 else if(m==5)
    return "May"; 
 else if(m==6)
    return "Jun";   
 else if(m==7)
    return "Jul"; 
 else if(m==8)
    return "Aug";  
 else if(m==9)
    return "Sep";  
 else if(m==10)
    return "Oct"; 
 else if(m==11)
    return "Nov";
 else if(m==12)
    return "Dec";     

}