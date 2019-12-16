const soap = require('soap')
const Dialogs = require('dialogs')

var url = 'http://localhost/soap/soapServer.php?wsdl';
var args = {min:'8000',max:'11000'};

function buscarValorGasolina(){
    let swalOptions;
    const dialogs = Dialogs()
    soap.createClient(url,(err,client) => {
        client.add(args,function(err,result){
            console.log(result);
            dialogs.confirm('El precio del combustible en esta estacion de servicio es de '+result.return.$value, ok => {
                console.log('confirm', ok)
            })
        });
    });
}
