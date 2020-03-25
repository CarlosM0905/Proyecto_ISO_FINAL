export var dd = {
	content: [
	    {
	        text: '02/20/2010', style: 'subheader'
	    },
	    
		{text: 'Resultados', style: 'header'},
		'Se listan las empresas seleccionadas previamente en el programa.',
		
		
		{
			style: 'tableExample',
			table: {
				widths: ['*', '*', '*', '*','*'],
				body: [
					[{text:'Nombre',style:'tableHeader'}, {text:'Dirección',style:'tableHeader'}, {text:'Provincia',style:'tableHeader'}, {text:'Teléfono',style:'tableHeader'}, {text:'Categoria',style:'tableHeader'}],
				]
			},
			layout: {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 2 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
				},
				
			}
		},
		
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10],
			alignment: 'center'
		},
		subheader: {
			fontSize: 14,
			bold: true,
			margin: [0, 10, 0, 5],
			alignment: 'right'
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 10,
			color: 'black'
		},
		data:{
			fontSize: 10
		}
	},
}

export var df = {
	content: [
	    {
	        text: '02/20/2010', style: 'subheader'
	    },
	    
		{text: 'Resultados', style: 'header'},
		'Se listan las empresas seleccionadas previamente en el programa.',
		
		
		{
			style: 'tableExample',
			table: {
				widths: ['*', '*', '*', '*','*','*'],
				body: [
					[{text:'Nombre',style:'tableHeader'}, {text:'Dirección',style:'tableHeader'}, {text:'Provincia',style:'tableHeader'}, {text:'Teléfono',style:'tableHeader'},{text:'Certificación',style:'tableHeader'}, {text:'Categoria',style:'tableHeader'}],
				]
			},
			layout: {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 2 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
				},
				
			}
		},
		
	],
	styles: {
		header: {
			fontSize: 15,
			bold: true,
			margin: [0, 0, 0, 10],
			alignment: 'center'
		},
		subheader: {
			fontSize: 14,
			bold: true,
			margin: [0, 10, 0, 5],
			alignment: 'right'
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 10,
			color: 'black'
		},
		data:{
			fontSize: 10
		}
	},
}