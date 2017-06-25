
        var nodos, aristas, network;
        var costos = new Array();

        // convenience method to stringify a JSON object
        /*
        function toJSON(obj) {
            return JSON.stringify(obj, null, 4);
        }
        */

        function agregarNodo() {
            try {
                nodos.add({
                    id: document.getElementById('nodo-id').value,
                    label: document.getElementById('nodo-label').value
                });
            }
            catch (err) {
                alert(err);
            }
        }

        /*
        function actualizarNodo() {
            try {
                nodos.update({
                    id: document.getElementById('nodo-id').value,
                    label: document.getElementById('nodd-label').value
                });
            }
            catch (err) {
                alert(err);
            }
        }
        */

        function eliminarNodo() {
            try {
                nodos.remove({id: document.getElementById('nodo-id').value});
            }
            catch (err) {
                alert(err);
            }
        }

        function agregarArista() {
            try {
                aristas.add({
                    id: document.getElementById('arista-id').value,
                    from: document.getElementById('arista-from').value,
                    to: document.getElementById('arista-to').value
                });
            }
            catch (err) {
                alert(err);
            }
            nNodo=document.getElementById('arista-costo').value;
            costos.push(nNodo);
           // var vN = costos.pop();
            //document.getElementById("demo").innerHTML = vN;
        }

        /*
        function actualizarArista() {
            try {
                aristas.update({
                    id: document.getElementById('arista-id').value,
                    from: document.getElementById('arista-from').value,
                    to: document.getElementById('arista-to').value
                });
            }
            catch (err) {
                alert(err);
            }
        }
        */

        function eliminarArista() {
            try {
                aristas.remove({id: document.getElementById('arista-id').value});
            }
            catch (err) {
                alert(err);
            }
            costos.pop();
        }

        function dibujar() {
            nodos = new vis.DataSet();
            nodos.add([{id: '1', label: 'Nodo 1'}]);

            aristas = new vis.DataSet();

            var container = document.getElementById('network');
            var data = {
                nodes: nodos,
                edges: aristas
            };
            var options = {};
            network = new vis.Network(container, data, options);

        }

        function resolver(){
           var tipoB = document.getElementById('opciones').value;
            if(tipoB==1)
                busqueda1();
            else if(tipoB==2)
                busqueda2();
            else if (tipoB==3)
                busqueda3();
            else if (tipoB == 4)
                busqueda4();
            else busqueda5();
        }

        function busqueda1(){
            document.write("preferente por amplitud");
           // nodos.toString();
            //document.getElementById("demo").innerHTML = nodos;
        }

        function busqueda2(){
            document.write("preferente por profundidad");
        }

        function busqueda3(){
            document.write("por profundidad limitada");
        }

        function busqueda4(){
            document.write("profundizacion iterativa");
        }

        function busqueda5(){
            document.write("Costo uniforme");
        }