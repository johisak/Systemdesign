function docLoaded(fn){
  if(document.readyState !== 'loading'){
	fn();
  }
  else{
	document.addEventListener('DOMContentLoaded', fn);
  }
}


function drinkTable() {
	for (var i = 0; i < drinks.length; i++){

		if((i % 2) == 0){
		  var tr = document.createElement('tr');
		  document.getElementById('tableDrink').appendChild(tr);
		}

		var td = document.createElement('td');
		td.id = drinks[i].label;
		td.value = drinks[i].price;

		var label = document.createElement('label');
		label.htmlfor = drinks[i].label;

		var button = document.createElement('input');
		button.type = "submit";
		button.value = drinks[i].label + ", " + drinks[i].size + "cl, " + drinks[i].price + ":-";
		button.name = drinks[i].label;


	    button.addEventListener("click", createAddToList( td ) );
	    button.style.height="4em";
	    button.style.width="20em";
	    button.style.textAlign="center";
	    button.fontStyle="oblique";


		label.appendChild(button);
		td.appendChild(label);
		tr.appendChild(td);
	  }
}


function foodTable(){
  for(var i = 0; i < foods.length; i++){

	if((i % 3) == 0){
	  var tr = document.createElement('tr');
	  document.getElementById('tableFood').appendChild(tr);
	}
      
    var importedImage = foods[i].img;
    var image = document.createElement("img");
    image.setAttribute("src", importedImage);
    image.style.height = '300px';
    image.style.width = '300px';

	var td = document.createElement('td');
	td.id = foods[i].label;
	td.value = foods[i].price;

	var label = document.createElement('label');
	label.htmlfor = foods[i].label;

	var button = document.createElement('input');
	button.type = "submit";
	button.value = foods[i].label + ", " + foods[i].price + ":-";
	button.name = foods[i].label;
	button.addEventListener("click", createAddToList( td ) );
    button.style.height="4em";
    button.style.width="20em";
    button.style.textAlign="center";
    button.fontStyle="oblique";

	label.appendChild(image);
	var br = document.createElement("br");
	td.appendChild(br);
	label.appendChild(button);
	td.appendChild(label);


	if(foods[i].details.length > 0){
	  var details = document.createElement('table');

	  	for(var j = 0; j < foods[i].details.length; j++){
			if( (j % 2) == 0){
			  var trDetails = document.createElement('tr');
			  details.appendChild(trDetails);
			}

			var tdDetails = document.createElement('td');
			var labelDetails = document.createElement('label');
			labelDetails.htmlfor = foods[i].details[j].extra;

			var checkboxDetails = document.createElement('input');
			checkboxDetails.type = "checkbox";
			checkboxDetails.value = foods[i].details[j].price;
			checkboxDetails.id = foods[i].details[j].extra;
			checkboxDetails.name = (foods[i].label + "extra");


			labelDetails.appendChild(checkboxDetails);
			labelDetails.appendChild( document.createTextNode( foods[i].details[j].extra + ", " + foods[i].details[j].price + ":-" ) );

			tdDetails.appendChild(labelDetails);
			trDetails.appendChild(tdDetails);
        }
    }

    td.appendChild(details);
    tr.appendChild(td);
  }
}



function sideorderTable(){
  for(var i = 0; i < sideorders.length; i++){

	if((i % 3) == 0){
	  var tr = document.createElement('tr');
	  document.getElementById('sideorderTable').appendChild(tr);
	}

	var td = document.createElement('td');
	td.id = sideorders[i].label;
	td.value = sideorders[i].price;
	
	var label = document.createElement('label');
	label.htmlfor = sideorders[i].label;


    var button = document.createElement('input');
    button.type = "submit";
    button.value = sideorders[i].label + ", " + sideorders[i].price + ":-";
    button.name = sideorders[i].label;
    button.addEventListener("click", createAddToList( td ) );
    button.style.height="4em";
    button.style.width="20em";
    button.style.textAlign="center";
    button.fontStyle="oblique";


	label.appendChild(button);
	td.appendChild(label);

	if(sideorders[i].details.length > 0){
	  var extraList = document.createElement('table');

	  	for(var j = 0; j < sideorders[i].details.length; j++){
			if( (j % 2) == 0){
			  	var trDetails = document.createElement('tr');
			  	extraList.appendChild(trDetails);
			}
			var tdDetails = document.createElement('td');
			var labelDetails = document.createElement('label');
			labelDetails.htmlfor = sideorders[i].details[j].extra;

			var checkboxDetails = document.createElement('input');
			checkboxDetails.type = "checkbox";
			checkboxDetails.value = sideorders[i].details[j].price;
			checkboxDetails.id = sideorders[i].details[j].extra;
			checkboxDetails.name = (sideorders[i].label + "extra");


			labelDetails.appendChild(checkboxDetails);
			labelDetails.appendChild( document.createTextNode( sideorders[i].details[j].extra + ", " + sideorders[i].details[j].price + ":-" ) );

			tdDetails.appendChild(labelDetails);
			trDetails.appendChild(tdDetails);
	  	}
	}

	td.appendChild(extraList);
	tr.appendChild(td);
  }
}


function createAddToList(name){
  	return function(){
		addToList(name);
  	}
}


function checkedCheckboxes(checkboxes){
  	var checked = [];
  	for (var i = 0; i < checkboxes.length; i++) {
	 	if (checkboxes[i].checked) {
			checked.push(checkboxes[i]);
	 	}
  	}

  return checked;
}


function createExtraList(name){
	var allCheckboxes = document.getElementsByName(name);
	var checked = checkedCheckboxes(allCheckboxes);
	if(checked.length > 0){
		var ul = document.createElement('ul');
		for(var i = 0; i < checked.length; i++){
			var li = document.createElement('li');
			li.value = checked[i].value;
			li.id = checked[i].id;
			li.appendChild( document.createTextNode(checked[i].id) );
			checked[i].checked = false;
			ul.appendChild(li);
		}
		return ul
	}
	else{
		return null
	}
}



function identicalDetails(currentDetails, orderDetails){
	if( (currentDetails == null || orderDetails == null) || (currentDetails.length != orderDetails.length) ){
		return false;
	}

	for(var i = 0; i < currentDetails.length; i++){
		if(currentDetails[i].value != orderDetails[i].value){
			return false;
		}
	}
	return true;
}


function totalPrice(itemPrice){
	var totalPrice = document.getElementById('totalPrice');
	var newTotal = Number(totalPrice.innerHTML);

	newTotal += Number(itemPrice);
	totalPrice.innerHTML = newTotal;
}


function identical(tableDetails, orderDetails){
	if(tableDetails == undefined){
		return false;
	}
	if(tableDetails.length != orderDetails.length){
		return false;
	}
	for(var i = 0; i < tableDetails.length; i++){
		if(tableDetails[i].id != orderDetails[i].id){
			return false;
		}
	}
	return true;
}


function addToList(name){

  var table = document.getElementById("orderTable");

  var col0 = document.createElement('td');
  col0.appendChild( document.createTextNode(1) );

  var col1 = document.createElement('td');
  col1.appendChild( document.createTextNode(name.id) );

  var col2 = document.createElement('td');
  var detailList = createExtraList(name.id + "extra");
  col2.value = detailList;

  var col3 = document.createElement('td');
  var orderPrice = name.value;

  if(detailList == null){	// IF ORDER DOES NOT CONTAIN DETAILS/EXTRAS
  	col1.colSpan = 2;		// THE COLUMN CONTAINING NAME SHOULD SPAN 2 COLUMNS

  }							// AND NO DETAIL COLUMN SHOULD BE ADDED
  else{
  	col2.appendChild(detailList)

  	var extraPrices = detailList.getElementsByTagName('li');	// IF THE ORDER CONTAINS EXTRA DETAILS
  	for(var i = 0; i < extraPrices.length; i++){				// GATHER THEM IN ARRAY AND ADD THEIR PRICES
  		orderPrice += extraPrices[i].value;						// TO THE PRICE OF THE ITEM ITSELF
  	}
  }



  // CHECKS IF ITEM TO BE ADDED ALREADY EXIST IN CURRENT ORDERS
  //
  for (var i = 0, row; row = table.rows[i]; i++) {
  	var itemInTable = row.cells.item(1).innerHTML;				// itemInTable == THE NAME OF THE ITEM IN THE TABLE ROW

	  	var containExtras = (col1.colSpan == 2); // IF ORDER DOES NOT CONTAIN DETAILS, COLUMN 1 IS SET TO 2

	  	var thirdColumn = row.cells.item(2).value;
	  	if(thirdColumn != null && !containExtras){
	  		var thirdColumnDetails = thirdColumn.getElementsByTagName('li');
	  		var identicalDetails = identical(thirdColumnDetails, detailList.getElementsByTagName('li'));
		}
		else{
			var identicalDetails = false;
		}

		
	  if( (name.id == itemInTable) && ( (identicalDetails && !containExtras) || (thirdColumn == null && containExtras) ) ){

		row.cells.item(0).innerHTML++; 							// INCREMENT NUMBER OF ITEMS BY 1

		if(containExtras){
		var price = Number(row.cells.item(2).innerHTML);		// ADDS THE PRICE OF ITEM TO BE ADDED 
		price += Number(name.value);							// WITH THE CURRENT PRICE
		row.cells.item(2).innerHTML = price;					//
		}
		else{
		var price = Number(row.cells.item(3).innerHTML);		// ADDS THE PRICE OF ITEM TO BE ADDED 
		price += orderPrice;									// WITH THE CURRENT PRICE
		row.cells.item(3).innerHTML = price;					//
		}

		totalPrice(orderPrice);									// ADDS PRICE OF ITEM TO BE ADDED TO TOTAL

		return 0;												// EXITS FUNCTION
	  }
	}

 	var tr = document.createElement('tr');
  	tr.appendChild(col0);						// col0 == NUMBER OF ITEM
  	tr.appendChild(col1);						// col1 == NAME OF ITEM
  	if(detailList != null){					
  		tr.appendChild(col2);					// IF THE ORDER CONTAINS A LIST OF DETAILS, APPEND IT
  	}

  	col3.appendChild( document.createTextNode( orderPrice ) );
  	tr.appendChild(col3);						// col3 == PRICE OF ITEM/ITEMS

  	totalPrice(orderPrice);					// ADDS PRICE OF ITEM TO BE ADDED TO TOTAL
  	document.getElementById('orderTable').appendChild(tr);
}


function indexPageLoaded(){
  drinkTable(); 
  foodTable();
  sideorderTable();
}

