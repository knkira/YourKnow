/**
 * Created by kn on 2017/3/25.
 */
 

var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
document.getElementById("save").addEventListener("click", save);



$("#scan").click(function(){
		// alert(navigator);
		// console.log(navigator);
		// //alert(navigator.camera);

	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
				"Format: " + result.format + "<br/>" +
				"Cancelled: " + result.cancelled;
			
			$("#status").html(s);
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
   //
   //
	// console.log(navigator.camera);
	// navigator.camera.getPicture(onSuccess, onFail, {
   //    quality: 50,
   //    destinationType: Camera.DestinationType.DATA_URL
   // });
   //
   // function onSuccess(imageData) {
   //    var image = document.getElementById('myImage');
   //    image.src = "data:image/jpeg;base64," + imageData;
   // }
   //
   // function onFail(message) {
   //    alert('Failed because: ' + message);
   // }
});

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})
function save(){
	var a = $('#code').val();
	console.log(a);
	var code = document.getElementById("code").value;
	var password = document.getElementById("password").value;
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO LOGSSS (id, password) VALUES (?, ?)',[code,password],function(tx,results){
			console.log(tx);
			console.log(results);
		});

	});	
}
