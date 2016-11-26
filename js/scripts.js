
let DOM = $("body");
let url = "https://private-f3b4b-interview2.apiary-mock.com/data"
let myMgs = $.get(url, data=> data);

myMgs.then( (data)=> {
		let container = DOM.find(".container");
		let i = 0;
		data.forEach((user)=>{
			i++;
			let url = user.image;
			let name = user.name.toUpperCase();
			let timestamp = user.timestamp;
			container.append(`<div class="${'row row' + i}">`);
			let rowNumber = container.find(`${'.row' + i}`);
			rowNumber.append(`<img src=${url} class="col-sm-1 img-circle" id="ghosts"/>`);
			rowNumber.append(`<div class="col-sm-11 text-left info" id="${'info' + i}">`);
			let infoNumber = rowNumber.find(`${'#info' + i}`);
			infoNumber.append(`<h1>${name}</h1>`);
			infoNumber.append(`<p>${moment(parseInt(timestamp)).subtract(1, 'months').format('M/D/YYYY')}</p>`);
			infoNumber.append('</div');
			rowNumber.append('</div>');
		});
	});