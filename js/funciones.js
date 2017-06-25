
var idAris = new Array(0);
var idRuta = new Array(0);
var nodos, aristas, network;
var costos = new Array();
var info_vecinos = new Map();
var mapa_nodos = new Map();
var id_nodo_act = 1;
var id_arista_act = 1;
var nodo_ini, nodo_final;


/*
function toJSON(obj) {
    return JSON.stringify(obj, null, 4);
}
*/

function agregarNodo() {
    try {
        var txt = id_nodo_act;
        nodos.add({
            id: id_nodo_act,
            label: id_nodo_act
        });
        mapa_nodos[txt] = id_nodo_act;
        id_nodo_act++;
        info_vecinos[txt] = new Array();
    }
    catch (err) {
        alert(err);
    }
}

function agregarArista() {
    try {
        
        var desde_txt = idAris.shift();
        var hasta_txt = idAris.shift();
        var costo = document.getElementById('arista-costo').value;
        var eName = costo.toString();
        console.log(desde_txt + "" + hasta_txt + "" + costo);
        aristas.add({
            id: id_arista_act,
            from: mapa_nodos[desde_txt],
            to: mapa_nodos[hasta_txt],
            label: eName,
            font: {'face': 'Monospace', align: 'horizontal'}
        });
        
        id_arista_act++;
        info_vecinos[desde_txt].push({ vecino: hasta_txt, costo: costo });
        info_vecinos[hasta_txt].push({ vecino: desde_txt, costo: costo });
        
        
    }
    catch (err) {
        alert(err);
    }
    
    costos.push(costo);
}



function dibujar() {
    nodos = new vis.DataSet();

    aristas = new vis.DataSet();

    var container = document.getElementById('network');
    var data = {
        nodes: nodos,
        edges: aristas
    };
    var options = {interaction:{hover:true}};
    network = new vis.Network(container, data, options);
    
    nodos.on('*', function (event, properties, senderId) {
        console.log('event', event, properties);
    });
    network.on("click", function (params) {
        params.event = "[original event]";
        var par = (JSON.stringify(params, null, -1));
        var p2 = par.split(/(\d)/);
        idAris.push(p2[1]);
        if (idAris.length==2){
            agregarArista();
        }
    });
    


}

function resolver(){

   nodo_ini = document.getElementById('txt_nodo_ini').value;
   nodo_final = document.getElementById('txt_nodo_final').value;
  // nodo_ini = idRuta.shift();
   //nodo_final = idRuta.shift();
   var tpo_busqueda = document.getElementById('opciones').value;
   var txt_ruta = "";
   var txt_visitados = "";

    if(tpo_busqueda == 1)
    {
        [ruta, visitados] = busquedaPreferentePorAmplitud(nodo_ini, nodo_final, info_vecinos);
        console.log(ruta.length);
        console.log(visitados.length);
        for(let i = 0; i < ruta.length; i++)
            txt_ruta += ruta[i].nombre;
        for(let i = 0; i < visitados.length; i++)
            txt_visitados += visitados[i].nombre;

        document.getElementById("txt_ruta").innerHTML = txt_ruta;
        document.getElementById("txt_nodos_visitados").innerHTML = txt_visitados;
    }

    else if(tpo_busqueda == 3){
        var limite = document.getElementById('Limite').value;

        [ruta, visitados,solucion] = busquedaPorProfundidadLimitada(nodo_ini, nodo_final, info_vecinos,limite);
        if(solucion== true){
            console.log(ruta.length);    
            for(let i = 0; i < ruta.length; i++)
                txt_ruta += ruta[i].nombre;
        }
        else {
            txt_ruta = ruta;
        }
        console.log(visitados.length);
        for(let i = 0; i < visitados.length; i++)
            txt_visitados += visitados[i].nombre;

        document.getElementById("txt_ruta").innerHTML = txt_ruta;
        document.getElementById("txt_nodos_visitados").innerHTML = txt_visitados;

    }
    else if (tpo_busqueda==2)
        {
            [ruta,visitados]=busquedaPreferentePorProfundidad(nodo_ini,nodo_final,info_vecinos);
        console.log(ruta.length);
        console.log(visitados);
        for(let i=0;i<ruta.length;i++)
            txt_ruta+=ruta[i].nombre;
        for(let i=0 ; i<visitados.length;i++)
            txt_visitados+=visitados[i].nombre;

        document.getElementById("txt_ruta").innerHTML = txt_ruta;
        document.getElementById("txt_nodos_visitados").innerHTML = txt_visitados;
        }
    else if (tpo_busqueda == 4){
            var solucion=false;
            var limite = 0;
            while(solucion == false || limite ==20){
                
                [ruta, visitados,solucion] = busquedaPorProfundidadLimitada(nodo_ini, nodo_final, info_vecinos,limite);
                
                if(solucion == true){
                    console.log(ruta.length);
                    txt_ruta += "<br><span>";    
                    for(let i = 0; i < ruta.length; i++)
                        txt_ruta += ruta[i].nombre;
                    txt_ruta += "  (Limite "+limite+")</span>";
                }
                else {
                    txt_ruta +="<br><span>"+ ruta+"</span>";
                }
                console.log(visitados.length);
                txt_visitados +="<br><span>";
                for(let i = 0; i < visitados.length; i++)
                    txt_visitados += visitados[i].nombre;
                txt_visitados += "</span>";

                limite++;
            }   
            document.getElementById("txt_ruta").innerHTML = txt_ruta;
            document.getElementById("txt_nodos_visitados").innerHTML = txt_visitados;
    }

    else{

         [ruta,visitados]=busquedaPorCostoUniforme(nodo_ini,nodo_final,info_vecinos);
        console.log(ruta.length);
        console.log(visitados);
        for(let i=0;i<ruta.length;i++)
            txt_ruta+=ruta[i].nombre;
        for(let i=0 ; i<visitados.length;i++)
            txt_visitados+=visitados[i].nombre;

        document.getElementById("txt_ruta").innerHTML = txt_ruta;
        document.getElementById("txt_nodos_visitados").innerHTML = txt_visitados;
    }
}
