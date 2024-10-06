function calculateTotal(){
	const value = Number(document.getElementById('value').value);
	const multiplier = Number(document.getElementById('multiplier').value);
	const vacaypercent = Number(document.getElementById('vacaypercent').value) || 0; // Default to 0 if empty
	const vacayweeks = Number(document.getElementById('vacayweeks').value) || 0;
	const rrsp = Number(document.getElementById('rrsp').value) || 0;
	const health = Number(document.getElementById('health').value) || 0;
	
	const total = (value * multiplier) + ((value * multiplier)/100*vacaypercent) + ((value * multiplier)/52*vacayweeks) + ((value * multiplier)/100*rrsp) + health;
	
	document.getElementById('result').innerText = `Compensation: ${total}`;
}

function calculateDiffPercent(){
	const current = Number(document.getElementById('current').value);
	const offered = Number(document.getElementById('offered').value);
	
	const difference = (offered-current)/current*100
	
	document.getElementById('diff').innerText = `Difference: ${difference}%`;
}

//Update result when input are changed
document.getElementById("value").addEventListener("input", calculateTotal);
document.getElementById("multiplier").addEventListener("input", calculateTotal);
document.getElementById("vacaypercent").addEventListener("input", calculateTotal);
document.getElementById("vacayweeks").addEventListener("input", calculateTotal);
document.getElementById("rrsp").addEventListener("input", calculateTotal);
document.getElementById("health").addEventListener("input", calculateTotal);

document.getElementById("current").addEventListener("input", calculateDiffPercent);
document.getElementById("offered").addEventListener("input", calculateDiffPercent);


///////////////////////////////////////////////////
//csv to table
///////////////////////////////////////////////////
let table = document.getElementById("salary");
fetch("salary.csv")
.then(res => res.text())
.then(csv => {
	table.innerHTML = "";
	let first = true;
	for (let row of CSV.parse(csv)) {
		let tr = table.insertRow();
		for (let col of row) {
			if (first) {
				let th = document.createElement("th");
				th.innerHTML = col;
				tr.appendChild(th);
			} 
			else {
				let td = tr.insertCell();
				td.innerHTML = col;
			}
	}
	first = false;
}
});


///////////////////////////////////////////////////
//filter and display
///////////////////////////////////////////////////
function filter() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("salary");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[1];
		if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
		}
		}       
	}
}