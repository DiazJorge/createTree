

function busquedaPreferentePorAmplitud(nodo_ini, nodo_final, grafo) {
	var cola = new Array;
	var nodo_act = { padre: null, nombre: nodo_ini };
	var nodo_meta = { padre: null, nombre: nodo_final };
	var nodos_visitados = new Array();

	cola.push(nodo_act);
	while(cola.length > 0)
	{
		nodo_act = cola[0];
		cola.splice(0, 1)
		nodos_visitados.push(nodo_act);
		if (nodo_act.nombre == nodo_meta.nombre)
		{
			ruta = new Array();
			while(nodo_act.padre != null)
			{
				ruta.push(nodo_act);
				nodo_act = nodo_act.padre;
			}
			ruta.push({padre: null, nombre: nodo_ini});
			ruta.reverse();
			return [ruta, nodos_visitados];
		}
		// Expandimos
		for(let i = 0; i < grafo[nodo_act.nombre].length; i++)
		{
			console.log(nodos_visitados);
			if(!seEncuentra(grafo[nodo_act.nombre][i].vecino, nodos_visitados))
				cola.push({ padre: nodo_act, nombre: grafo[nodo_act.nombre][i].vecino });
		}
	}
}

function busquedaPreferentePorProfundidad(nodo_ini, nodo_final, grafo) {
	var pila = [];
    var nodo_act = { padre: null, nombre: nodo_ini };
    var nodo_meta = { padre: null, nombre: nodo_final };
//  var nodos_visitados = new Array();
    var nodos_visitados = [];
    pila.push(nodo_act);
   // var limite= 3;
    //var limiteAux = limite;

    while(pila.length > 0  )
    {
        //nodo_act = pila[0];
        nodo_act = pila.pop();
        //pila.splice(0, 1)
        //pila.pop();

        nodos_visitados.push(nodo_act);
        if (nodo_act.nombre == nodo_meta.nombre)
        {
            ruta = new Array();
            while(nodo_act.padre != null)
            {
                ruta.push(nodo_act);
                nodo_act = nodo_act.padre;
            }
            ruta.push({padre: null, nombre: nodo_ini});
            ruta.reverse();
            return [ruta, nodos_visitados,true];
        }
        // Expandimos
       
       		for(let i = 0; i < grafo[nodo_act.nombre].length; i++)
       			{
            	console.log(nodos_visitados);
           		 if(!seEncuentra(grafo[nodo_act.nombre][i].vecino, nodos_visitados))
                pila.push({ padre: nodo_act, nombre: grafo[nodo_act.nombre][i].vecino });
       			}   
    }
}



function seEncuentra(nodo, nodos) {
	console.log("Nodo: " + nodo);
	
	for(let i = 0; i < nodos.length; i++)
		if(nodo == nodos[i].nombre)
			return true;
		return false;
}

function busquedaPorCostoUniforme(nodo_ini, nodo_final, grafo) {
	var pila = [];
    var nodo_act = { padre: null, nombre: nodo_ini };
    var nodo_meta = { padre: null, nombre: nodo_final };
	var ordena= new Array();
    var nodos_visitados = [];
    //console.log("HOLA COSTO:" + grafo[nodo_act.nombre][0].costo);
    pila.push(grafo[nodo_act.nombre][0].costo);
  
    while(pila.length > 0  )
    {
        nodo_act= pila.pop();

        nodos_visitados.push(nodo_act);
        if (nodo_act.nombre == nodo_meta.nombre)
        {
            ruta = new Array();
            while(nodo_act.padre != null)
            {
                ruta.push(nodo_act);
                nodo_act = nodo_act.padre;
            }
            ruta.push({padre: null, nombre: nodo_ini});
            ruta.reverse();
            return [ruta, nodos_visitados,true];
        }
        // Expandimos
       
       		for(let i = 0; i < grafo[nodo_act.nombre].length; i++)
       			{
            	console.log(nodos_visitados);
           		 if(!seEncuentra(grafo[nodo_act.nombre][i].vecino, nodos_visitados))
                //pila.push({ padre: nodo_act, nombre: grafo[nodo_act.nombre][i].costo });
            	Ordenar(pila.push({ padre: nodo_act, nombre: grafo[nodo_act.nombre][i].costo }));
				//ordena.push({ padre: nodo_act, nombre: grafo[nodo_act.nombre][i].vecino });
       			}   
       		
    }
}

function busquedaPorProfundidadLimitada(nodo_ini, nodo_final, grafo, limite){
    var pila = [];
    var nodo_act = { padre: null, nombre: nodo_ini, nivel: 0 };
    var nodo_meta = { padre: null, nombre: nodo_final};
//  var nodos_visitados = new Array();
    var nodos_visitados = [];
    pila.push(nodo_act);
   // var limite= 3;
    var limiteAux = limite;
    var limiteAux2 = 0;

    while(pila.length > 0  )
    {
        //nodo_act = pila[0];
        nodo_act = pila.pop();
        //pila.splice(0, 1)
        //pila.pop();

        nodos_visitados.push(nodo_act);
        if (nodo_act.nombre == nodo_meta.nombre)
        {
            ruta = new Array();
            while(nodo_act.padre != null)
            {
                ruta.push(nodo_act);
                nodo_act = nodo_act.padre;
            }
            ruta.push({padre: null, nombre: nodo_ini});
            ruta.reverse();
            return [ruta, nodos_visitados,true];
        }
        // Expandimos
       if (nodo_act.nivel < limite  ) {
       		limiteAux2++;	
       		for(let i = 0; i < grafo[nodo_act.nombre].length; i++)
       			{
            	console.log(nodos_visitados);
           		 if(!seEncuentra(grafo[nodo_act.nombre][i].vecino, nodos_visitados))
                pila.push({ padre: nodo_act, nombre: grafo[nodo_act.nombre][i].vecino,nivel: limiteAux2 });
       			}

       }
               
    }
    var rutaAux= "No se alcanza al nodo meta con limite de profundidad: "+limiteAux;
    return [rutaAux, nodos_visitados,false];

}



//--------------------------------------
function Ordenar(myArr){
  var size = myArr.length;
 
  for( var pass = 1; pass < size; pass++ ){ // outer loop
    for( var left = 0; left < (size - pass); left++){ // inner loop
      var right = left + 1;
      if( myArr[left] > myArr[right] ){
        swap(myArr, left, right);
      }
    }
  }
 
  return myArr;
}