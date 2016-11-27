
let DOM = $("body");
let $_clear = DOM.find('#clear');
let $_secret = DOM.find('#secret');
let colorArray = [];


let url = "https://private-f3b4b-interview2.apiary-mock.com/data"
let myMgs = $.get(url, data=> data);

$_clear.on('click', (e)=>{
		if (colorArray.length>0) {
			$_secret.removeClass(colorArray[0]);
			$_secret.html("???");
		}
		
		for (var i = 0; i < colorArray.length; i++) {
			colorArray.pop();
		}
});

myMgs.then( (data)=> {
		let container_body = DOM.find(".container > .container_body");
		let i = 0;
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

