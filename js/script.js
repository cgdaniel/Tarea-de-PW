async function Leer() {


    const singer = document.getElementById("input").value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e092a073f9msh3239318923289f3p131f48jsne99606215052',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${singer}`, options)
        .then(resultado => resultado.json())
        .then(resultado=>{
            console.log(resultado);

            const {data=[]} = resultado;
            
            console.log(data[0]);
            document.getElementById("lista").innerHTML='';


            data.map((p)=>{
                document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
                    <h1>${p.title}</h1>
            </div>`;
            })
      });

    
    //buscar3();
}

// const buscar3 = async () => {

//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'e092a073f9msh3239318923289f3p131f48jsne99606215052',
//             'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
//         }
//     };
//     const cancion = document.getElementById("input").value;
//     fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=' + cancion, options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));

// }
