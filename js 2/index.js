var firebaseConfig = {
    apiKey: "AIzaSyBqRvgde99lsBzAPBCGt2cDMgexdifHgKA",
    authDomain: "biblioteca-de-comics.firebaseapp.com",
    databaseURL: "https://biblioteca-de-comics-default-rtdb.firebaseio.com",
    projectId: "biblioteca-de-comics",
    storageBucket: "biblioteca-de-comics.appspot.com",
    messagingSenderId: "569410545985",
    appId: "1:569410545985:web:02d870af7a155a4504d9c0",
    measurementId: "G-SG7N414P7P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
    document.getElementById("Input8").value='';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input8").value;
    var titulo = document.getElementById("Input1").value;
    var autor = document.getElementById("Input2").value;
    var editorial = document.getElementById("Input4").value;
    var numeroC = document.getElementById("Input3").value;
    var precio = document.getElementById("Input5").value;
    var genero = document.getElementById("Input6").value;
    var fecha = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var alumno = {
            id, //matricula:id
            titulo,
            editorial,
            autor,
            numeroC,
            precio,
            genero,
            fecha,
        }

        //console.log(alumno);

        firebase.database().ref('Alumnos/' + id).update(alumno).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input8").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Alumnos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(alumno){
    
    if(alumno!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
       
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = alumno.id;
        cell2.innerHTML = alumno.titulo; 
        cell3.innerHTML = alumno.autor;
        cell4.innerHTML = alumno.numeroC; 
        cell5.innerHTML = alumno.precio; 
        cell6.innerHTML = alumno.genero; 
        cell7.innerHTML = alumno.fecha; 
        cell8.innerHTML = alumno.editorial;
       cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${alumno.id})">Eliminar</button>`;
        cell10.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+alumno.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Alumnos/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Alumnos/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(alumno){
    if(alumno!=null)
    {
        document.getElementById("Input1").value=alumno.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=alumno.titulo;
        document.getElementById("Input3").value=alumno.editorial;
        document.getElementById("Input4").value=alumno.autor;
        document.getElementById("Input5").value=alumno.numeroC;
        document.getElementById("Input6").value=alumno.precio;
        document.getElementById("Input7").value=alumno.genero;
        document.getElementById("Input8").value=alumno.fecha;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Alumnos");
    ref.orderByChild("editorial").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(alumno){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = alumno.id;
    cell2.innerHTML = alumno.titulo; 
    cell3.innerHTML = alumno.autor;
    cell4.innerHTML = alumno.numeroC; 
    cell5.innerHTML = alumno.precio; 
    cell6.innerHTML = alumno.genero; 
    cell7.innerHTML = alumno.fecha; 
    cell8.innerHTML = alumno.editorial;
   
}