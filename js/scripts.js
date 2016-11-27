
(()=>{

//cache the DOM
let DOM = $("body");

//set aside the clear and secret containers for later use
let $_clear = DOM.find('#clear');
let $_secret = DOM.find('#secret');

//color array will help manage adding and subtracting color classes from secret div
let colorArray = [];

let url = "https://private-f3b4b-interview2.apiary-mock.com/data"

//store ajax response in variable 
let myMgs = $.get(url, data=> data);

//click event manages the clear button
$_clear.on('click', ()=>{
		if (colorArray.length>0) {
			$_secret.removeClass(colorArray[0]);
			$_secret.html("???");
		}
		
		for (var i = 0; i < colorArray.length; i++) {
			colorArray.pop();
		}
});

//resolve ajax request with a Promise
myMgs.then( (data)=> {
		let container_body = DOM.find(".container > .container_body");
		let i = 0;

		//build out the character rows
		data.forEach((user)=>{
			i++;
			let url = user.image;
			let name = user.name.toUpperCase();
			let timestamp = user.timestamp;
			container_body.append(`<div class="${'row row' + i}" data-secret="${user.secret}"></div>`);
			let rowNumber = container_body.find(`${'.row' + i}`);
			rowNumber.append(`<img src=${url} class="col-sm-1 img-circle" id="ghosts"/>`);
			rowNumber.append(`<div class="col-sm-10 text-left info" id="${'info' + i}"></div>`);
			let infoNumber = rowNumber.find(`${'#info' + i}`);
			infoNumber.append(`<h1>${name}</h1>`);
			infoNumber.append(`<p>${moment(parseInt(timestamp)).subtract(1, 'months').format('M/D/YYYY')}</p>`);

			//add a click event to each character row to change the color of the secret element
			rowNumber.on('click', (e)=>{
				let $_target = e.delegateTarget;
				let secretColor = $_target.dataset.secret;
				if (colorArray.length<1) {
					colorArray.push(secretColor);
					$_secret.addClass(secretColor);
					$_secret.html(secretColor);
				}else{
					colorArray.push(secretColor);
					$_secret.removeClass(colorArray[0]).addClass(colorArray[1]);
					$_secret.html(secretColor);
					colorArray.shift();
				}
			});
		});
	});
})();

