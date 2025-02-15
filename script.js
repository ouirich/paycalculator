///////////////////////////////////////////////////
//forms
///////////////////////////////////////////////////

function calculateTotal(){
	const value = Number(document.getElementById('value').value);
	const multiplier = Number(document.getElementById('multiplier').value);
	const vacaypercent = Number(document.getElementById('vacaypercent').value) || 0; // Default to 0 if empty
	const vacayweeks = Number(document.getElementById('vacayweeks').value) || 0;
	const rrsp = Number(document.getElementById('rrsp').value) || 0;
	const health = Number(document.getElementById('health').value) || 0;
	let union = document.querySelector("#union");
	if (union.checked) {
		union = 0.02;
	} else {union = 0;}
	
	let annually = value * multiplier;
	const total = (annually + (value * multiplier/100*vacaypercent) + (value * multiplier/52*vacayweeks) + (value * multiplier/100*rrsp) + health) - (annually*union);
	const comp = total.toFixed(2);
	
	document.getElementById('result').innerText = `Compensation: ${comp}`;
	if (multiplier == 2080){
		let weekly = (value * 40 - value * 40 * union).toFixed(2);
		let monthly = (weekly * 4.333).toFixed(2);
		let annually = (weekly * 52).toFixed(2);
		document.getElementById('break').innerText = `Weekly: ${weekly} / Monthly: ${monthly} / Annually: ${annually}`;
	}
	if (multiplier == 52){
		let hourly = (value / 40 - value / 40 * union).toFixed(2);
		let monthly = (hourly * 40 * 4.333).toFixed(2);
		let annually = (hourly * 8 * 260).toFixed(2);
		document.getElementById('break').innerText = `Hourly: ${hourly} / Monthly: ${monthly} / Annually: ${annually}`;
	}
	if (multiplier == 12){
		let hourly = (value / 173.34 - value / 173.34 * union).toFixed(2);
		let weekly = (hourly * 40).toFixed(2);
		let annually = (hourly * 8 * 12).toFixed(2);
		document.getElementById('break').innerText = `Hourly: ${hourly} / Weekly: ${weekly} / Annually: ${annually}`;
	}
	if (multiplier == 1){
		let hourly = (value / 2080 - value / 2080 * union).toFixed(2);
		let weekly = (hourly * 40).toFixed(2);
		let monthly = (hourly * 40 * 4.333).toFixed(2);
		document.getElementById('break').innerText = `Hourly: ${hourly} / Weekly: ${weekly} / Monthly: ${monthly}`;
	}
}

function calculateTax(){
	const value = Number(document.getElementById('value').value);
	const multiplier = Number(document.getElementById('multiplier').value);
	const annually = value * multiplier;

	const fedTax = calculateFed(annually);
	const bcTax = calculateBC(annually);
	const EIpremium = 1077.48
	const CPP = 3867.50
	const tax = fedTax+bcTax+EIpremium+CPP;
	const takeHome = annually-tax;

	if (value == "") {
		document.getElementById('aftertax').innerText = `Please enter a value for Salary`;
	}
	else {
	document.getElementById('aftertax').innerText = `Estimation on after tax pay (BC) \n Weekly: ${(takeHome/52).toFixed(2)} / Biweekly: ${(takeHome/26).toFixed(2)} / Monthly: ${(takeHome/12).toFixed(2)} / Annually: ${takeHome.toFixed(2)}`;
	}
}

function calculateFed(annually){
	let tax = 0;
	if (annually<=55867){
		tax = annually * 0.15;
	}
	else if (annually<=114750){
		tax = (57375 * 0.15) + (annually-57375) * 0.205;
	}
	else if (annually<=173205){
		tax = (57375 * 0.15) + (114750-57375) * 0.205 + (annually-114750) * 0.26;
	}
	else if (annually<=253414){
		tax = (57375 * 0.15) + (114750-57375) * 0.205 + (177882-114750) * 0.26 + (annually-177882) * 0.29;
	}
	else {
		tax = (57375 * 0.15) + (114750-57375) * 0.205 + (177882-114750) * 0.26 + (253414-177882) * 0.29 + (annually-253414) * 0.33;
	}
	return tax;
}

function calculateBC(annually){
	let tax = 0;
	if (annually<=49276){
		tax = annually * 0.0506;
	}
	else if (annually<=98560){
		tax = (49276 * 0.0506) + (annually-49276) * 0.077;
	}
	else if (annually<=113158){
		tax = (49276 * 0.0506) + (98560-49276) * 0.077 + (annually-98560) * 0.105;
	}
	else if (annually<=137407){
		tax = (49276 * 0.0506) + (98560-49276) * 0.077 + (113158-98560) * 0.105 + (annually-113158) * 0.1229;
	}
	else if (annually<=186306){
		tax = (49276 * 0.0506) + (98560-49276) * 0.077 + (113158-98560) * 0.105 + (137407-113158) * 0.1229 + (annually-137407) * 0.147;
	}
	else if (annually<=259829){
		tax = (49276 * 0.0506) + (98560-49276) * 0.077 + (113158-98560) * 0.105 + (137407-113158) * 0.1229 + (186306-137407) * 0.147 + (annually-186306) * 0.168;
	}
	else {
		tax = (49276 * 0.0506) + (98560-49276) * 0.077 + (113158-98560) * 0.105 + (137407-113158) * 0.1229 + (186306-137407) * 0.147 + (259829-186306) * 0.168 + (annually-259829) * 0.205;
	}
	return tax;
}

function calculateDiffPercent(){
	const current = Number(document.getElementById('current').value);
	const offered = Number(document.getElementById('offered').value);
	
	const difference = ((offered-current)/current*100).toFixed(2);
	if (isFinite(difference)){
		document.getElementById('diff').innerText = `Difference: ${difference}%`;
	}
	else {document.getElementById('diff').innerText = `Please enter a value for Current`;}
	
}

//Update result when input are changed
document.getElementById("value").addEventListener("input", calculateTotal);
document.getElementById("multiplier").addEventListener("input", calculateTotal);
document.getElementById("vacaypercent").addEventListener("input", calculateTotal);
document.getElementById("vacayweeks").addEventListener("input", calculateTotal);
document.getElementById("rrsp").addEventListener("input", calculateTotal);
document.getElementById("health").addEventListener("input", calculateTotal);
document.getElementById("union").addEventListener("input", calculateTotal);

btn=document.getElementById("netpay")
btn.addEventListener('click', function() {
	btn.textContent = 'Net Pay';
	calculateTax();
});
document.getElementById("value").addEventListener("input", function(){btn.textContent = 'Estimate Net Pay';});
document.getElementById("multiplier").addEventListener("input", function(){btn.textContent = 'Estimate Net Pay';});

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
	var input = document.getElementById("searchInput");
	var filter = input.value.toUpperCase();
	var table = document.getElementById("salary");
	var tr = table.getElementsByTagName("tr");

	for (var i = 0; i < tr.length; i++) {
		var td = tr[i].getElementsByTagName("td")[1];
		if (td) {
		var txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
		}
		}       
	}
}