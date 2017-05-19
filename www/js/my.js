/**
 * Created by kn on 2017/3/25.
 */
 

var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
document.getElementById("save").addEventListener("click", save);



$("#scan").click(function(){
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var temp = result.splite("/");
			text = temp[temp.length-1];
			var s = load(text);
			if(s=="没有找到"){
				modal();
				$("#code").val(text);
			}
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
});

$("#search").click(function(){
	var text = $("#searchText").val();
	var s = load(text);
	
});

function modal() {
	$('#myModal').on('shown.bs.modal', function () {
		$('#myInput').focus()
	})
}

function save(){
	var a = $('#code').val();
	console.log(a);
	var code = document.getElementById("code").value;
	var password = document.getElementById("password").value;
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO huangche (id, password) VALUES (?, ?)',[code,password],function(tx,results){
			console.log(tx);
			console.log(results);
		});

	});	
}

function load(text,cb){
	db.transaction(function (tx) {
		tx.executeSql('select * from huangche where id like ?',['%'+text+'%'],function(tx,results){
			var s = "";
			for(var i = 0;i<results.rows.length;i++){
				var result = results.rows[i];
				s += "车号: " + result.id + "----" +
				"密码: " + result.password + "<br/>"; 
			
			}	
			if(s==""){
				s="没有找到";
				cb(s);
			}
			
			$("#status").html(s);
			return s ; 
			
		});

	});	
}
