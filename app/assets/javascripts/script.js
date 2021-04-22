var createListenerInfo
var addGenerations

$(document).ready(function(){

    var limit = 0
    var offsent = 0

    var pkms = $('#pokemons')

    callPkms = function (){
        limit = limit + 20
        $.ajax({
            beforeSend: function(){
                pkms.empty()
            },
            url: 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offsent,
            dataType: 'json',
            type: 'get',
            success: function(data){
                
                data.results.forEach(function(pokemon){

                    var div_card_pkm = document.createElement('div');
                    div_card_pkm.className = 'card mt-2 mb-2';

                        var div_card_body = document.createElement('div');
                        div_card_body.className = 'card-body';

                            h5_card_body = document.createElement('h5');
                            h5_card_body.className = 'card-title';
                            h5_card_body.innerHTML = pokemon.name;
                            div_card_body.append(h5_card_body);

                            btn_card_body = document.createElement('button');
                            btn_card_body.className = 'btn btn-primary pkm-info';
                            btn_card_body.dataset.target = '#modalInfo';
                            btn_card_body.dataset.toggle = 'modal';
                            btn_card_body.dataset.url = pokemon.url;
                            btn_card_body.innerHTML = 'Ver más...';
                            div_card_body.append(btn_card_body);

                        div_card_pkm.append(div_card_body);

                    pkms.append(div_card_pkm);
                })

                createListenerInfo()
            },
            error: function(){
                pkms.html('Ha ocurrido un error')
            }
        })
    }

    
    createListenerInfo = function () {$('.pkm-info').on('click', function(){
        var url = $(this).data('url')
        var modalBody = $('#modal-body');

        $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            success: function(data) {
                
                var kind = '';
                
                data.types.forEach(type => kind+= type.type.name+' ' )
                
                var abilities = ''
                
                data.abilities.forEach(ability => abilities+= ability.ability.name+' '  )
                
                var moves = ''
                
                for(i = 0; i < 5; i++){
                    moves += data.moves[i].move.name+' '
                }

                modalBody.html(`<div class="container">
                <p>Nombre: ${data.name}</p>
                <p>Tipo: ${kind}</p>
                <p>Generacion: ${addGenerations(data.types)}</p>
                <p>Habilidad: ${abilities}</p>
                <p>Movimientos: ${moves}</p>
                </div>`); 
                
            }
        })
    })}
    
    addGenerations = function(types){
        var generaciones = ""

        types.forEach( function(type){
            var url = type.type.url;
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'get',
                async: false,
                success: function(data) {
                    generaciones += String(data.generation.name)+' '
                }
            })
        })

        return generaciones
    }

    $('#callPkms').on('click', function(){
        callPkms()
    })
})